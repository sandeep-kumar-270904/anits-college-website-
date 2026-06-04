"""
Logging configuration for ANITS Campus Chat application.
Provides structured logging to file and console.
"""

import logging
import logging.handlers
import os
from datetime import datetime


class ColoredFormatter(logging.Formatter):
    """Custom formatter with color support for console output."""

    COLORS = {
        "DEBUG": "\033[36m",  # Cyan
        "INFO": "\033[32m",  # Green
        "WARNING": "\033[33m",  # Yellow
        "ERROR": "\033[31m",  # Red
        "CRITICAL": "\033[35m",  # Magenta
    }
    RESET = "\033[0m"

    def format(self, record):
        log_color = self.COLORS.get(record.levelname, self.RESET)
        record.levelname = f"{log_color}{record.levelname}{self.RESET}"
        return super().format(record)


def setup_logger(
    name: str,
    log_file: str = "logs/app.log",
    log_level: str = "INFO",
    max_bytes: int = 10485760,  # 10MB
    backup_count: int = 5,
) -> logging.Logger:
    """
    Setup logger with file and console handlers.

    Args:
        name: Logger name
        log_file: Path to log file
        log_level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        max_bytes: Max size before log rotation
        backup_count: Number of backup files to keep

    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, log_level.upper()))

    # Avoid duplicate handlers
    if logger.handlers:
        return logger

    # Create logs directory if needed
    log_dir = os.path.dirname(log_file)
    if log_dir and not os.path.exists(log_dir):
        os.makedirs(log_dir, exist_ok=True)

    # Log format
    log_format = "%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s"
    formatter = logging.Formatter(log_format)

    # File handler with rotation
    file_handler = logging.handlers.RotatingFileHandler(
        log_file, maxBytes=max_bytes, backupCount=backup_count
    )
    file_handler.setLevel(getattr(logging, log_level.upper()))
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    # Console handler with colors
    console_handler = logging.StreamHandler()
    console_handler.setLevel(getattr(logging, log_level.upper()))
    console_formatter = ColoredFormatter(log_format)
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)

    return logger


class StructuredLogger:
    """Wrapper for structured logging with context tracking."""

    def __init__(self, logger: logging.Logger):
        """
        Initialize structured logger.

        Args:
            logger: Base logger instance
        """
        self.logger = logger
        self.context = {}

    def set_context(self, **kwargs):
        """
        Set context for all subsequent logs.

        Args:
            **kwargs: Context key-value pairs
        """
        self.context.update(kwargs)

    def clear_context(self):
        """Clear all context."""
        self.context.clear()

    def _format_message(self, message: str) -> str:
        """
        Format message with context.

        Args:
            message: Log message

        Returns:
            Formatted message with context
        """
        if self.context:
            context_str = " | ".join(f"{k}={v}" for k, v in self.context.items())
            return f"{message} | {context_str}"
        return message

    def debug(self, message: str, **kwargs):
        """Log debug message with context."""
        self.set_context(**kwargs)
        self.logger.debug(self._format_message(message))

    def info(self, message: str, **kwargs):
        """Log info message with context."""
        self.set_context(**kwargs)
        self.logger.info(self._format_message(message))

    def warning(self, message: str, **kwargs):
        """Log warning message with context."""
        self.set_context(**kwargs)
        self.logger.warning(self._format_message(message))

    def error(self, message: str, **kwargs):
        """Log error message with context."""
        self.set_context(**kwargs)
        self.logger.error(self._format_message(message), exc_info=True)

    def critical(self, message: str, **kwargs):
        """Log critical message with context."""
        self.set_context(**kwargs)
        self.logger.critical(self._format_message(message), exc_info=True)


def log_function_call(logger: logging.Logger):
    """
    Decorator to log function calls with arguments and return values.

    Args:
        logger: Logger instance

    Returns:
        Decorator function
    """

    def decorator(func):
        def wrapper(*args, **kwargs):
            logger.debug(
                f"Calling {func.__name__} with args={args}, kwargs={kwargs}"
            )
            try:
                result = func(*args, **kwargs)
                logger.debug(f"{func.__name__} returned {type(result).__name__}")
                return result
            except Exception as e:
                logger.error(
                    f"{func.__name__} raised {type(e).__name__}: {str(e)}",
                    exc_info=True,
                )
                raise

        return wrapper

    return decorator
