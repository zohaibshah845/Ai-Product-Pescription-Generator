from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Any, Dict
from app.models.user import User, UserUsage
import logging

logger = logging.getLogger(__name__)

def check_usage_limit(user_id: int, db: Session) -> None:
    """Check if user has reached their usage limit"""
    try:
        usage = db.query(UserUsage).filter(UserUsage.user_id == user_id).first()
        user = db.query(User).filter(User.id == user_id).first()
        
        if not usage:
            # Create usage record if it doesn't exist
            usage = UserUsage(
                user_id=user_id,
                monthly_limit=100,
                reset_date=datetime.now() + timedelta(days=30)
            )
            db.add(usage)
            db.commit()
            return
        
        # Reset monthly limit if needed
        if usage.reset_date and usage.reset_date < datetime.now():
            usage.descriptions_generated = 0
            usage.reset_date = datetime.now() + timedelta(days=30)
            db.commit()
        
        # Check limit
        limit = 999999 if user and user.is_premium else usage.monthly_limit
        
        if usage.descriptions_generated >= limit:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Monthly usage limit of {limit} reached. Please upgrade your plan."
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error checking usage limit: {str(e)}")

def format_response(data: Any, message: str = None, status_code: int = 200) -> Dict:
    """Format API response"""
    response = {
        "status": "success" if 200 <= status_code < 300 else "error",
        "data": data
    }
    if message:
        response["message"] = message
    return response