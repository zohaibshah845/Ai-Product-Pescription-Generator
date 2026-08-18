from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
import uuid

class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String(36), unique=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    description = Column(Text)
    logo_url = Column(String(500))
    settings = Column(JSON, default={})
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    owner = relationship("User", foreign_keys=[owner_id])
    members = relationship("TeamMember", back_populates="team", cascade="all, delete-orphan")
    shared_products = relationship("SharedProduct", back_populates="team", cascade="all, delete-orphan")
    invitations = relationship("TeamInvitation", back_populates="team", cascade="all, delete-orphan")

class TeamMember(Base):
    __tablename__ = "team_members"
    
    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(String(50))  # admin, member, viewer
    permissions = Column(JSON, default={})
    joined_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    team = relationship("Team", back_populates="members")
    user = relationship("User", back_populates="team_memberships")

class TeamInvitation(Base):
    __tablename__ = "team_invitations"
    
    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    email = Column(String(255))
    role = Column(String(50))
    token = Column(String(255), unique=True, default=lambda: str(uuid.uuid4()))
    invited_by = Column(Integer, ForeignKey("users.id"))
    status = Column(String(50))  # pending, accepted, declined, expired
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime)
    accepted_at = Column(DateTime)
    
    team = relationship("Team", back_populates="invitations")

class SharedProduct(Base):
    __tablename__ = "shared_products"
    
    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    shared_by = Column(Integer, ForeignKey("users.id"))
    can_edit = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    team = relationship("Team", back_populates="shared_products")
    product = relationship("Product", back_populates="shared_with")