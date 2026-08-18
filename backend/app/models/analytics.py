from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_type = Column(String(50))  # generation, export, copy, view, login, signup
    product_id = Column(Integer, ForeignKey("products.id"), nullable=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=True)
    metadata = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="analytics_events")

class UsageMetrics(Base):
    __tablename__ = "usage_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime)
    generations_count = Column(Integer, default=0)
    exports_count = Column(Integer, default=0)
    api_calls = Column(Integer, default=0)
    tokens_used = Column(Integer, default=0)
    cost_incurred = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

class DashboardStats(Base):
    __tablename__ = "dashboard_stats"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_generations = Column(Integer, default=0)
    total_exports = Column(Integer, default=0)
    total_products = Column(Integer, default=0)
    total_teams = Column(Integer, default=0)
    average_generation_time = Column(Float, default=0.0)
    favorite_descriptions = Column(Integer, default=0)
    last_active = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)