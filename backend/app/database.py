from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./product_generator.db")

# Configure engine based on database type
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool
    )
else:
    engine = create_engine(
        DATABASE_URL,
        pool_size=10,
        max_overflow=20
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database with default data"""
    from app.models.user import User
    from app.models.subscription import SubscriptionPlan
    
    db = SessionLocal()
    try:
        # Create default subscription plans
        plans = [
            SubscriptionPlan(
                name="Free",
                stripe_price_id="free",
                price=0,
                currency="USD",
                interval="month",
                features={
                    "max_products": 5,
                    "max_team_members": 1,
                    "max_generations_per_month": 10,
                    "ai_models": ["template"],
                    "support": "community"
                },
                max_products=5,
                max_team_members=1,
                max_generations_per_month=10,
                is_active=True
            ),
            SubscriptionPlan(
                name="Starter",
                stripe_price_id="price_starter",
                price=9.99,
                currency="USD",
                interval="month",
                features={
                    "max_products": 50,
                    "max_team_members": 3,
                    "max_generations_per_month": 100,
                    "ai_models": ["template", "gpt-3.5"],
                    "support": "email"
                },
                max_products=50,
                max_team_members=3,
                max_generations_per_month=100,
                is_active=True
            ),
            SubscriptionPlan(
                name="Professional",
                stripe_price_id="price_professional",
                price=29.99,
                currency="USD",
                interval="month",
                features={
                    "max_products": 500,
                    "max_team_members": 10,
                    "max_generations_per_month": 1000,
                    "ai_models": ["template", "gpt-3.5", "gpt-4"],
                    "support": "priority"
                },
                max_products=500,
                max_team_members=10,
                max_generations_per_month=1000,
                is_active=True
            ),
            SubscriptionPlan(
                name="Enterprise",
                stripe_price_id="price_enterprise",
                price=99.99,
                currency="USD",
                interval="month",
                features={
                    "max_products": -1,  # Unlimited
                    "max_team_members": -1,  # Unlimited
                    "max_generations_per_month": -1,  # Unlimited
                    "ai_models": ["template", "gpt-3.5", "gpt-4", "custom"],
                    "support": "dedicated"
                },
                max_products=-1,
                max_team_members=-1,
                max_generations_per_month=-1,
                is_active=True
            )
        ]
        
        for plan in plans:
            existing = db.query(SubscriptionPlan).filter_by(name=plan.name).first()
            if not existing:
                db.add(plan)
        
        db.commit()
        print("Database initialized with default subscription plans")
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()