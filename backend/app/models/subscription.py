from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True)
    stripe_price_id = Column(String(255), unique=True)
    price = Column(Float)
    currency = Column(String(10), default="USD")
    interval = Column(String(20))  # month, year
    features = Column(JSON)
    max_products = Column(Integer)
    max_team_members = Column(Integer)
    max_generations_per_month = Column(Integer)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    subscriptions = relationship("Subscription", back_populates="plan")

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    plan_id = Column(Integer, ForeignKey("subscription_plans.id"))
    stripe_subscription_id = Column(String(255), unique=True)
    stripe_customer_id = Column(String(255))
    status = Column(String(50))  # active, canceled, past_due, unpaid, trialing
    trial_start = Column(DateTime)
    trial_end = Column(DateTime)
    current_period_start = Column(DateTime)
    current_period_end = Column(DateTime)
    cancel_at_period_end = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="subscription")
    plan = relationship("SubscriptionPlan", back_populates="subscriptions")
    payments = relationship("Payment", back_populates="subscription")

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    subscription_id = Column(Integer, ForeignKey("subscriptions.id"))
    stripe_payment_id = Column(String(255), unique=True)
    amount = Column(Float)
    currency = Column(String(10))
    status = Column(String(50))  # succeeded, failed, pending, refunded
    payment_method = Column(String(50))
    invoice_url = Column(String(500))
    receipt_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    subscription = relationship("Subscription", back_populates="payments")