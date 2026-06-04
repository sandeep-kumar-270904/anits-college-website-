"""
Translation service for ANITS Campus Chat application.
Handles language detection and translation operations.
"""

import logging
from typing import Tuple, Optional
from googletrans import Translator
from utils.validators import detect_language_safe, validate_language, ValidationError
from utils.cache import TranslationCache
from utils.logger import setup_logger

logger = setup_logger(__name__)
translation_cache = TranslationCache(ttl_seconds=86400)  # 24 hours


class TranslationService:
    """Service for handling language detection and translation."""

    def __init__(self, supported_languages: list, enable_cache: bool = True):
        """
        Initialize translation service.

        Args:
            supported_languages: List of supported language codes
            enable_cache: Whether to cache translations
        """
        self.translator = Translator()
        self.supported_languages = supported_languages
        self.enable_cache = enable_cache
        logger.info(f"TranslationService initialized with {len(supported_languages)} languages")

    def detect_language(self, text: str) -> str:
        """
        Detect language of given text.

        Args:
            text: Text to detect language for

        Returns:
            Language code (e.g., 'en', 'ta')
        """
        if not text:
            return "en"

        detected = detect_language_safe(text, default_lang="en")
        logger.debug(f"Detected language: {detected} for text: {text[:50]}...")
        return detected

    def translate(self, text: str, src_lang: str, dest_lang: str) -> str:
        """
        Translate text from source to destination language.

        Args:
            text: Text to translate
            src_lang: Source language code
            dest_lang: Destination language code

        Returns:
            Translated text

        Raises:
            ValidationError: If language codes are invalid
        """
        if not text:
            return text

        # Same language - no translation needed
        if src_lang == dest_lang:
            return text

        # Check cache first
        if self.enable_cache:
            cached = translation_cache.get_translation(text, src_lang, dest_lang)
            if cached:
                logger.debug(f"Cache hit for translation {src_lang}→{dest_lang}")
                return cached

        try:
            logger.debug(f"Translating from {src_lang} to {dest_lang}")
            result = self.translator.translate(text, src_lang=src_lang, dest_lang=dest_lang)
            translated_text = result.text

            # Cache the result
            if self.enable_cache:
                translation_cache.cache_translation(text, src_lang, dest_lang, translated_text)

            return translated_text

        except Exception as e:
            logger.error(f"Translation failed: {str(e)}", exc_info=True)
            return text  # Fallback to original text on error

    def translate_batch(self, texts: list, src_lang: str, dest_lang: str) -> list:
        """
        Translate multiple texts in batch.

        Args:
            texts: List of texts to translate
            src_lang: Source language code
            dest_lang: Destination language code

        Returns:
            List of translated texts
        """
        logger.debug(f"Batch translating {len(texts)} texts from {src_lang} to {dest_lang}")
        return [self.translate(text, src_lang, dest_lang) for text in texts]

    def detect_and_translate(self, text: str, dest_lang: str) -> Tuple[str, str]:
        """
        Detect language and translate to destination language.

        Args:
            text: Text to process
            dest_lang: Destination language code

        Returns:
            Tuple of (detected_language, translated_text)
        """
        detected_lang = self.detect_language(text)
        translated_text = self.translate(text, detected_lang, dest_lang)
        return detected_lang, translated_text

    def is_language_supported(self, language: str) -> bool:
        """
        Check if language is supported.

        Args:
            language: Language code to check

        Returns:
            True if supported, False otherwise
        """
        return language in self.supported_languages

    def clear_cache(self):
        """Clear translation cache."""
        translation_cache.clear_all()
        logger.info("Translation cache cleared")
