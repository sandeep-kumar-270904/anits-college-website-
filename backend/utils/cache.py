"""
Caching utilities for ANITS Campus Chat application.
Provides in-memory caching with TTL support.
"""

import hashlib
from typing import Any, Optional, Callable
from datetime import datetime, timedelta
import functools


class CacheEntry:
    """Represents a single cache entry with TTL."""

    def __init__(self, value: Any, ttl_seconds: int):
        """
        Initialize cache entry.

        Args:
            value: Cached value
            ttl_seconds: Time to live in seconds
        """
        self.value = value
        self.created_at = datetime.utcnow()
        self.ttl_seconds = ttl_seconds

    def is_expired(self) -> bool:
        """Check if cache entry has expired."""
        expiration_time = self.created_at + timedelta(seconds=self.ttl_seconds)
        return datetime.utcnow() > expiration_time


class InMemoryCache:
    """Simple in-memory cache with TTL support."""

    def __init__(self):
        """Initialize cache storage."""
        self.cache = {}

    def get(self, key: str) -> Optional[Any]:
        """
        Get value from cache.

        Args:
            key: Cache key

        Returns:
            Cached value or None if expired/missing
        """
        if key not in self.cache:
            return None

        entry = self.cache[key]
        if entry.is_expired():
            del self.cache[key]
            return None

        return entry.value

    def set(self, key: str, value: Any, ttl_seconds: int = 3600):
        """
        Set value in cache.

        Args:
            key: Cache key
            value: Value to cache
            ttl_seconds: Time to live in seconds
        """
        self.cache[key] = CacheEntry(value, ttl_seconds)

    def delete(self, key: str):
        """Delete cache entry."""
        if key in self.cache:
            del self.cache[key]

    def clear(self):
        """Clear all cache entries."""
        self.cache.clear()


class PDFCache:
    """Cache for PDF content extraction with TTL."""

    def __init__(self, ttl_seconds: int = 3600):
        """
        Initialize PDF cache.

        Args:
            ttl_seconds: Time to live in seconds
        """
        self.cache = InMemoryCache()
        self.ttl_seconds = ttl_seconds

    def get_cached_pdfs(self, pdf_dir: str) -> Optional[str]:
        """
        Get cached PDF content.

        Args:
            pdf_dir: PDF directory path

        Returns:
            Cached PDF content or None
        """
        cache_key = f"pdf_content:{pdf_dir}"
        return self.cache.get(cache_key)

    def cache_pdfs(self, pdf_dir: str, content: str):
        """
        Cache PDF content.

        Args:
            pdf_dir: PDF directory path
            content: Extracted PDF content
        """
        cache_key = f"pdf_content:{pdf_dir}"
        self.cache.set(cache_key, content, self.ttl_seconds)

    def invalidate(self):
        """Invalidate all PDF cache."""
        self.cache.clear()


class FAQCache:
    """Cache for FAQ data with TTL."""

    def __init__(self, ttl_seconds: int = 1800):
        """
        Initialize FAQ cache.

        Args:
            ttl_seconds: Time to live in seconds
        """
        self.cache = InMemoryCache()
        self.ttl_seconds = ttl_seconds

    def get_faqs(self) -> Optional[list]:
        """Get cached FAQ data."""
        return self.cache.get("faq_data")

    def cache_faqs(self, faqs: list):
        """Cache FAQ data."""
        self.cache.set("faq_data", faqs, self.ttl_seconds)

    def invalidate(self):
        """Invalidate FAQ cache."""
        self.cache.delete("faq_data")


class TranslationCache:
    """Cache for translation results with TTL."""

    def __init__(self, ttl_seconds: int = 86400):
        """
        Initialize translation cache.

        Args:
            ttl_seconds: Time to live in seconds
        """
        self.cache = InMemoryCache()
        self.ttl_seconds = ttl_seconds

    def _make_key(self, text: str, src_lang: str, dest_lang: str) -> str:
        """Generate cache key for translation."""
        combined = f"{text}:{src_lang}:{dest_lang}"
        hash_digest = hashlib.md5(combined.encode()).hexdigest()
        return f"translation:{hash_digest}"

    def get_translation(self, text: str, src_lang: str, dest_lang: str) -> Optional[str]:
        """Get cached translation."""
        key = self._make_key(text, src_lang, dest_lang)
        return self.cache.get(key)

    def cache_translation(self, text: str, src_lang: str, dest_lang: str, translation: str):
        """Cache translation result."""
        key = self._make_key(text, src_lang, dest_lang)
        self.cache.set(key, translation, self.ttl_seconds)

    def clear_all(self):
        """Clear all translations."""
        self.cache.clear()


class LLMResponseCache:
    """Cache for LLM responses with TTL."""

    def __init__(self, ttl_seconds: int = 86400):
        """Initialize LLM response cache."""
        self.cache = InMemoryCache()
        self.ttl_seconds = ttl_seconds

    def _make_key(self, query: str) -> str:
        """Generate cache key for LLM response."""
        hash_digest = hashlib.md5(query.encode()).hexdigest()
        return f"llm_response:{hash_digest}"

    def get_response(self, query: str) -> Optional[str]:
        """Get cached LLM response."""
        key = self._make_key(query)
        return self.cache.get(key)

    def cache_response(self, query: str, response: str):
        """Cache LLM response."""
        key = self._make_key(query)
        self.cache.set(key, response, self.ttl_seconds)

    def clear_all(self):
        """Clear all LLM responses."""
        self.cache.clear()


def cached(ttl_seconds: int = 3600) -> Callable:
    """
    Decorator to cache function results with TTL.

    Args:
        ttl_seconds: Time to live in seconds

    Returns:
        Decorator function
    """

    def decorator(func):
        cache = {}

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Create cache key from arguments
            cache_key = (args, tuple(sorted(kwargs.items())))

            # Convert to string key
            try:
                key = str(cache_key)
            except:
                # If we can't create a key, just call the function
                return func(*args, **kwargs)

            # Check cache
            if key in cache:
                entry = cache[key]
                if datetime.utcnow() < entry["expires_at"]:
                    return entry["value"]
                else:
                    del cache[key]

            # Call function and cache result
            result = func(*args, **kwargs)
            cache[key] = {
                "value": result,
                "expires_at": datetime.utcnow() + timedelta(seconds=ttl_seconds),
            }

            return result

        return wrapper

    return decorator
