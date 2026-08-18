from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import logging

from app.models.user import User, UserUsage
from app.schemas.auth import UserCreate, Token
from app.utils.config import settings

logger = logging.getLogger(__name__)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    """Authentication service for user management"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against a hashed password"""
        return pwd_context.verify(plain_password, hashed_password)
    
    def get_password_hash(self, password: str) -> str:
        """Hash a password"""
        return pwd_context.hash(password)
    
    def create_access_token(self, data: dict, expires_delta: timedelta = None) -> str:
        """Create a JWT access token"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt
    
    def register_user(self, user_data: UserCreate) -> Token:
        """Register a new user"""
        # Check if user exists
        existing_user = self.db.query(User).filter(
            (User.email == user_data.email) | (User.username == user_data.username)
        ).first()
        
        if existing_user:
            raise ValueError("Email or username already registered")
        
        # Create new user
        hashed_password = self.get_password_hash(user_data.password)
        db_user = User(
            email=user_data.email,
            username=user_data.username,
            hashed_password=hashed_password,
            full_name=user_data.full_name,
            is_premium=False,
            subscription_tier="free"
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        
        # Create usage record
        usage = UserUsage(
            user_id=db_user.id, 
            monthly_limit=100,
            reset_date=datetime.now() + timedelta(days=30)
        )
        self.db.add(usage)
        self.db.commit()
        
        # Create access token
        access_token = self.create_access_token(data={"sub": str(db_user.id)})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": db_user.id,
            "is_premium": False
        }
    
    def login_user(self, email: str, password: str) -> Token:
        """Login an existing user"""
        user = self.db.query(User).filter(User.email == email).first()
        if not user or not self.verify_password(password, user.hashed_password):
            raise ValueError("Incorrect email or password")
        
        access_token = self.create_access_token(data={"sub": str(user.id)})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user.id,
            "is_premium": user.is_premium
        }
    
    def get_user_by_id(self, user_id: int) -> User:
        """Get a user by ID"""
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("User not found")
        return user
    
    def get_user_by_email(self, email: str) -> User:
        """Get a user by email"""
        user = self.db.query(User).filter(User.email == email).first()
        return user
    
    def verify_token(self, token: str) -> dict:
        """Verify a JWT token and return the payload"""
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            return payload
        except JWTError as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise ValueError("Invalid token")