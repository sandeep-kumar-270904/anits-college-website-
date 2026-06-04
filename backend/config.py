"""
Configuration management for ANITS Campus Chat Application.
Handles environment-specific settings and feature flags.
"""

import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Base configuration - defaults for all environments."""

    # Flask Configuration
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv("APP_SECRET_KEY", "dev-secret-key-change-in-production")

    # Application Settings
    APP_NAME = "ANITS Campus Chat"
    APP_VERSION = "1.0.0"

    # Message Validation
    MAX_MESSAGE_LENGTH = 5000
    MIN_MESSAGE_LENGTH = 1
    ALLOWED_MESSAGE_TYPES = ["text", "voice"]

    # Language Configuration
    SUPPORTED_LANGUAGES = ["en", "ta", "te", "hi", "ur", "ml", "kn", "bn", "gu", "mr"]
    DEFAULT_LANGUAGE = "en"

    # Rate Limiting
    RATE_LIMIT_ENABLED = True
    RATE_LIMIT_REQUESTS = 10
    RATE_LIMIT_WINDOW_SECONDS = 60
    RATE_LIMIT_STORAGE_URL = "memory://"  # or redis://localhost:6379

    # PDF Processing
    PDF_CACHE_ENABLED = True
    PDF_CACHE_TTL_SECONDS = 3600  # 1 hour
    MAX_PDF_SIZE_MB = 50
    ALLOWED_PDF_EXTENSIONS = ["pdf"]
    PDF_DIRECTORY = "data/circulars"

    # FAQ Configuration
    FAQ_FILE_PATH = "../data/faqs.json"
    FAQ_CACHE_TTL_SECONDS = 1800  # 30 minutes
    FAQ_MATCH_CONFIDENCE_THRESHOLD = 0.6
    FAQ_TOP_K_RESULTS = 3

    # Translation Service
    TRANSLATION_CACHE_ENABLED = True
    TRANSLATION_CACHE_TTL_SECONDS = 86400  # 24 hours
    TRANSLATION_BATCH_SIZE = 10

    # LLM Configuration (OpenAI)
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    OPENAI_MODEL = "gpt-4o-mini"
    OPENAI_MAX_TOKENS = 500
    OPENAI_TEMPERATURE = 0.7
    OPENAI_TOP_P = 0.9
    OPENAI_TIMEOUT_SECONDS = 30
    OPENAI_MAX_RETRIES = 3
    OPENAI_RETRY_DELAY_SECONDS = 2

    # Database Configuration
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///database.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    DATABASE_POOL_SIZE = 10
    DATABASE_POOL_RECYCLE = 3600
    DATABASE_ECHO = False

    # CORS Configuration
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    CORS_ALLOW_HEADERS = ["Content-Type", "Authorization"]
    CORS_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    CORS_MAX_AGE = 3600

    # Logging Configuration
    LOG_LEVEL = "INFO"
    LOG_FILE_PATH = "logs/app.log"
    LOG_FILE_MAX_BYTES = 10485760  # 10MB
    LOG_FILE_BACKUP_COUNT = 5
    LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

    # Authentication
    AUTH_ENABLED = True
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key-change-in-production")
    JWT_ALGORITHM = "HS256"
    JWT_EXPIRATION_HOURS = 24

    # Admin Settings
    ADMIN_TOKEN = os.getenv("ADMIN_TOKEN")
    ADMIN_DASHBOARD_ENABLED = True

    # Monitoring & Metrics
    METRICS_ENABLED = True
    METRICS_PORT = 9090
    SENTRY_ENABLED = os.getenv("SENTRY_ENABLED", "False") == "True"
    SENTRY_DSN = os.getenv("SENTRY_DSN")

    # Performance
    ENABLE_CACHING = True
    ENABLE_COMPRESSION = True
    REQUEST_TIMEOUT_SECONDS = 60

    # Feature Flags
    ENABLE_VOICE_INPUT = False
    ENABLE_STREAMING_RESPONSES = False
    ENABLE_USER_FEEDBACK = True
    ENABLE_SENTIMENT_ANALYSIS = False


class DevelopmentConfig(Config):
    """Development environment configuration."""

    DEBUG = True
    TESTING = False
    LOG_LEVEL = "DEBUG"
    SQLALCHEMY_ECHO = True
    DATABASE_ECHO = True
    RATE_LIMIT_ENABLED = False
    CORS_ORIGINS = ["http://localhost:3000", "http://localhost:5000"]


class TestingConfig(Config):
    """Testing environment configuration."""

    DEBUG = True
    TESTING = True
    DATABASE_URL = "sqlite:///:memory:"  # In-memory database for tests
    RATE_LIMIT_ENABLED = False
    LOG_LEVEL = "DEBUG"
    AUTH_ENABLED = False
    PDF_CACHE_ENABLED = False
    TRANSLATION_CACHE_ENABLED = False


class ProductionConfig(Config):
    """Production environment configuration."""

    DEBUG = False
    TESTING = False
    LOG_LEVEL = "WARNING"
    RATE_LIMIT_ENABLED = True
    RATE_LIMIT_REQUESTS = 5
    RATE_LIMIT_WINDOW_SECONDS = 60
    CORS_ORIGINS = [
        "https://anits.edu.in",
        "https://www.anits.edu.in",
        "https://portal.anits.edu.in",
    ]
    ENABLE_CACHING = True
    SENTRY_ENABLED = True
    METRICS_ENABLED = True
    OPENAI_MAX_RETRIES = 5


# Configuration selection
def get_config(env: str = None) -> Config:
    """
    Get configuration based on environment.

    Args:
        env: Environment name (development, testing, production)

    Returns:
        Configuration object

    Raises:
        ValueError: If environment is invalid
    """
    if env is None:
        env = os.getenv("FLASK_ENV", "development").lower()

    config_map = {
        "development": DevelopmentConfig,
        "testing": TestingConfig,
        "production": ProductionConfig,
    }

    if env not in config_map:
        raise ValueError(f"Invalid environment: {env}. Must be one of {list(config_map.keys())}")

    return config_map[env]
