from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.utils.database import Base

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(255), nullable=False)
    category = Column(String(100))
    key_features = Column(JSON)  # List of features
    target_audience = Column(String(255))
    additional_info = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    descriptions = relationship("Description", back_populates="product", cascade="all, delete-orphan")

class Description(Base):
    __tablename__ = "descriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    title = Column(String(255))
    content = Column(Text)
    bullet_points = Column(JSON)  # List of bullet points
    seo_keywords = Column(JSON)  # List of keywords
    tone = Column(String(50))
    length = Column(String(20))
    is_favorite = Column(Boolean, default=False)
    version = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    product = relationship("Product", back_populates="descriptions")

class Template(Base):
    __tablename__ = "templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    structure = Column(JSON)  # Template structure
    tone = Column(String(50))
    is_premium = Column(Boolean, default=False)
    usage_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())