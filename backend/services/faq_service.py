"""
FAQ service for ANITS Campus Chat application.
Handles FAQ loading, caching, and intelligent matching.
"""

import json
import logging
from typing import Optional, List, Tuple
from utils.cache import FAQCache
from utils.logger import setup_logger

logger = setup_logger(__name__)
faq_cache = FAQCache(ttl_seconds=1800)  # 30 minutes


class FAQService:
    """Service for FAQ operations including loading, matching, and ranking."""

    def __init__(self, faq_file_path: str, enable_cache: bool = True):
        """
        Initialize FAQ service.

        Args:
            faq_file_path: Path to FAQ JSON file
            enable_cache: Whether to cache FAQ data
        """
        self.faq_file_path = faq_file_path
        self.enable_cache = enable_cache
        self.faqs = []
        self._load_faqs()
        logger.info(f"FAQService initialized with {len(self.faqs)} FAQs")

    def _load_faqs(self) -> List[dict]:
        """
        Load FAQs from file with caching.

        Returns:
            List of FAQ entries
        """
        # Check cache first
        if self.enable_cache:
            cached_faqs = faq_cache.get_faqs()
            if cached_faqs:
                self.faqs = cached_faqs
                logger.debug(f"Loaded {len(self.faqs)} FAQs from cache")
                return cached_faqs

        try:
            with open(self.faq_file_path, "r", encoding="utf-8") as f:
                self.faqs = json.load(f)
            logger.info(f"Loaded {len(self.faqs)} FAQs from file")

            # Cache the FAQs
            if self.enable_cache:
                faq_cache.cache_faqs(self.faqs)

            return self.faqs

        except FileNotFoundError:
            logger.error(f"FAQ file not found: {self.faq_file_path}")
            self.faqs = []
            return []
        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON in FAQ file: {str(e)}")
            self.faqs = []
            return []

    def find_matching_faq(
        self, query: str, language: str = "en", threshold: float = 0.6
    ) -> Optional[dict]:
        """
        Find matching FAQ for given query.

        Args:
            query: User query
            language: Language code
            threshold: Confidence threshold (0.0-1.0)

        Returns:
            Matching FAQ entry or None

        Implementation: Simple substring matching with length-based scoring
        """
        if not query or not self.faqs:
            return None

        query_lower = query.lower()
        best_match = None
        best_score = 0

        for faq in self.faqs:
            # Skip if language doesn't match
            if faq.get("language", "en") != language:
                continue

            faq_question = faq.get("question", "").lower()

            # Calculate match score based on substring presence
            if query_lower in faq_question or faq_question in query_lower:
                # Exact or high similarity
                score = 1.0
            else:
                # Check individual words
                query_words = set(query_lower.split())
                faq_words = set(faq_question.split())
                common_words = query_words & faq_words

                if common_words:
                    # Score based on word overlap
                    score = len(common_words) / max(len(query_words), len(faq_words))
                else:
                    score = 0

            if score > best_score and score >= threshold:
                best_score = score
                best_match = faq.copy()
                best_match["confidence"] = score

        if best_match:
            logger.debug(f"Found FAQ match with score {best_score:.2f}: {best_match['question'][:50]}")
            return best_match

        logger.debug(f"No FAQ match found for query: {query[:50]}")
        return None

    def find_top_k_matches(
        self, query: str, language: str = "en", k: int = 3, threshold: float = 0.5
    ) -> List[dict]:
        """
        Find top K matching FAQs for given query.

        Args:
            query: User query
            language: Language code
            k: Number of top results to return
            threshold: Minimum confidence threshold

        Returns:
            List of matching FAQ entries sorted by confidence
        """
        if not query or not self.faqs:
            return []

        query_lower = query.lower()
        matches = []

        for faq in self.faqs:
            # Skip if language doesn't match
            if faq.get("language", "en") != language:
                continue

            faq_question = faq.get("question", "").lower()

            # Calculate match score
            if query_lower in faq_question or faq_question in query_lower:
                score = 1.0
            else:
                query_words = set(query_lower.split())
                faq_words = set(faq_question.split())
                common_words = query_words & faq_words

                if common_words:
                    score = len(common_words) / max(len(query_words), len(faq_words))
                else:
                    score = 0

            if score >= threshold:
                faq_copy = faq.copy()
                faq_copy["confidence"] = score
                matches.append(faq_copy)

        # Sort by confidence descending
        matches.sort(key=lambda x: x["confidence"], reverse=True)

        # Return top K
        result = matches[:k]
        logger.debug(f"Found {len(result)} FAQ matches for query")
        return result

    def get_faq_by_id(self, faq_id: int) -> Optional[dict]:
        """
        Get FAQ by ID.

        Args:
            faq_id: FAQ ID

        Returns:
            FAQ entry or None
        """
        for faq in self.faqs:
            if faq.get("id") == faq_id:
                return faq
        return None

    def get_all_faqs(self, language: str = "en") -> List[dict]:
        """
        Get all FAQs for a language.

        Args:
            language: Language code

        Returns:
            List of FAQ entries
        """
        return [faq for faq in self.faqs if faq.get("language", "en") == language]

    def reload_faqs(self):
        """Reload FAQs from file and refresh cache."""
        if self.enable_cache:
            faq_cache.invalidate()
        self._load_faqs()
        logger.info("FAQs reloaded")
