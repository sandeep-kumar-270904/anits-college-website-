"""
Input validators for the ANITS Campus Chat application.
Handles validation and sanitization of user inputs.
"""

import re
from typing import Tuple, Optional
from langdetect import detect, LangDetectException


class ValidationError(Exception):
    """Custom exception for validation errors."""
    pass


def validate_message(message: str, max_length: int = 5000) -> Tuple[bool, Optional[str]]:
    """
    Validate chat message input.

    Args:
        message: User input message
        max_length: Maximum allowed message length

    Returns:
        Tuple of (is_valid, error_message)
    """
    if not message:
        return False, "Message cannot be empty"

    message = message.strip()

    if not message:
        return False, "Message cannot be only whitespace"

    if len(message) > max_length:
        return False, f"Message exceeds {max_length} character limit"

    if len(message) < 2:
        return False, "Message must be at least 2 characters long"

    # Check for suspicious patterns (likely spam/bot)
    if len(message) > 100 and message.count(" ") < 3:
        return False, "Message appears to contain invalid characters or patterns"

    # Check for excessive special characters
    special_chars = sum(1 for c in message if not c.isalnum() and c != " " and c != "?" and c != ".")
    if special_chars / len(message) > 0.3:
        return False, "Message contains too many special characters"

    return True, None


def validate_language(language: str, supported_languages: list) -> Tuple[bool, Optional[str]]:
    """
    Validate language code.

    Args:
        language: Language code (e.g., 'en', 'ta')
        supported_languages: List of supported language codes

    Returns:
        Tuple of (is_valid, error_message)
    """
    if not language:
        return False, "Language code cannot be empty"

    if language not in supported_languages:
        return False, f"Language '{language}' is not supported"

    return True, None


def validate_json_request(data: dict, required_fields: list) -> Tuple[bool, Optional[str]]:
    """
    Validate incoming JSON request has required fields.

    Args:
        data: Request data dictionary
        required_fields: List of required field names

    Returns:
        Tuple of (is_valid, error_message)
    """
    if not data or not isinstance(data, dict):
        return False, "Request body must be valid JSON"

    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: '{field}'"

        if data[field] is None:
            return False, f"Field '{field}' cannot be null"

    return True, None


def validate_api_key(api_key: Optional[str], allow_none: bool = False) -> Tuple[bool, Optional[str]]:
    """
    Validate API key format.

    Args:
        api_key: API key to validate
        allow_none: Whether to allow None values

    Returns:
        Tuple of (is_valid, error_message)
    """
    if api_key is None:
        if allow_none:
            return True, None
        return False, "API key is required"

    if not isinstance(api_key, str) or len(api_key) < 10:
        return False, "Invalid API key format"

    return True, None


def detect_language_safe(text: str, default_lang: str = "en") -> str:
    """
    Safely detect language of text with fallback.

    Args:
        text: Text to detect language for
        default_lang: Fallback language if detection fails

    Returns:
        Detected language code
    """
    if not text or len(text.strip()) == 0:
        return default_lang

    try:
        detected = detect(text)
        return detected if detected else default_lang
    except (LangDetectException, TypeError):
        return default_lang


def sanitize_input(text: str) -> str:
    """
    Remove potentially harmful characters from input.

    Args:
        text: Text to sanitize

    Returns:
        Sanitized text
    """
    if not text:
        return ""

    # Remove null bytes
    text = text.replace("\x00", "")

    # Remove control characters (except newlines and tabs)
    text = "".join(ch for ch in text if ch.isprintable() or ch in "\n\t")

    # Strip leading/trailing whitespace
    text = text.strip()

    return text


def validate_pagination(page: int, limit: int, max_limit: int = 100) -> Tuple[bool, Optional[str]]:
    """
    Validate pagination parameters.

    Args:
        page: Page number (starts at 1)
        limit: Items per page
        max_limit: Maximum allowed limit

    Returns:
        Tuple of (is_valid, error_message)
    """
    if page < 1:
        return False, "Page number must be >= 1"

    if limit < 1:
        return False, "Limit must be >= 1"

    if limit > max_limit:
        return False, f"Limit exceeds maximum of {max_limit}"

    return True, None
