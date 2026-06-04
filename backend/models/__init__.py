"""
Enhanced database models for ANITS Campus Chat application.
Includes ChatLog, FAQEntry, and UserSession models.
"""

from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float, Boolean, Index
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ChatLog(Base):
    """Enhanced chat log model with additional tracking fields."""

    __tablename__ = "chat_logs"

    # Primary key
    id = Column(Integer, primary_key=True)

    # Core message data
    user_id = Column(String(100), index=True, nullable=True)  # Track specific users
    user_message = Column(Text, nullable=False)
    bot_reply = Column(Text, nullable=False)

    # Language and translation tracking
    language = Column(String(10), nullable=False, index=True)
    detected_language = Column(String(10), nullable=True)

    # Response source tracking
    response_source = Column(String(20), nullable=True)  # 'FAQ' or 'LLM'
    faq_match_confidence = Column(Float, nullable=True)  # Confidence score 0.0-1.0

    # Performance tracking
    processing_time_ms = Column(Integer, nullable=True)  # Time to process in milliseconds

    # Error tracking
    error_occurred = Column(Boolean, default=False)
    error_message = Column(Text, nullable=True)

    # User feedback
    user_feedback_score = Column(Integer, nullable=True)  # 1-5 rating
    is_helpful = Column(Boolean, nullable=True)  # Thumbs up/down

    # Escalation tracking
    is_escalated = Column(Boolean, default=False)
    escalation_reason = Column(Text, nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Composite indexes for common queries
    __table_args__ = (
        Index("idx_language_timestamp", "language", "created_at"),
        Index("idx_response_source", "response_source"),
        Index("idx_user_timestamp", "user_id", "created_at"),
    )

    def __repr__(self):
        return f"<ChatLog(id={self.id}, lang={self.language}, source={self.response_source})>"


class FAQEntry(Base):
    """FAQ database entry model."""

    __tablename__ = "faq_entries"

    id = Column(Integer, primary_key=True)
    question = Column(Text, nullable=False, index=True)
    answer = Column(Text, nullable=False)

    # Categorization
    category = Column(String(100), nullable=True, index=True)
    language = Column(String(10), default="en", nullable=False)
    keywords = Column(Text, nullable=True)  # Comma-separated keywords

    # Quality tracking
    confidence_threshold = Column(Float, default=0.6)
    hit_count = Column(Integer, default=0)  # Track how often this FAQ is used
    relevance_score = Column(Float, nullable=True)

    # Lifecycle
    is_active = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_used_at = Column(DateTime, nullable=True)

    __table_args__ = (
        Index("idx_category_language", "category", "language"),
        Index("idx_active_language", "is_active", "language"),
    )

    def __repr__(self):
        return f"<FAQEntry(id={self.id}, category={self.category}, hits={self.hit_count})>"


class UserSession(Base):
    """User session tracking model."""

    __tablename__ = "user_sessions"

    id = Column(Integer, primary_key=True)
    user_id = Column(String(100), nullable=False, index=True)
    session_id = Column(String(100), nullable=False, unique=True)

    # User preferences
    preferred_language = Column(String(10), default="en")
    timezone = Column(String(50), nullable=True)

    # Session tracking
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(Text, nullable=True)
    device_type = Column(String(50), nullable=True)  # 'mobile', 'desktop', etc.

    # Activity tracking
    total_messages = Column(Integer, default=0)
    total_interactions = Column(Integer, default=0)
    average_session_duration_seconds = Column(Integer, nullable=True)

    # Session state
    is_active = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    last_activity = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)

    __table_args__ = (
        Index("idx_user_active", "user_id", "is_active"),
        Index("idx_last_activity", "last_activity"),
    )

    def __repr__(self):
        return f"<UserSession(user_id={self.user_id}, messages={self.total_messages})>"
