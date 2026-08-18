import re
from typing import Optional, Tuple


def validate_email_address(email: str) -> bool:
    """Validate email address without external dependency"""
    # Simple email validation regex
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_password_strength(password: str) -> Tuple[bool, Optional[str]]:
    """Validate password strength"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r'\d', password):
        return False, "Password must contain at least one number"
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "Password must contain at least one special character"
    
    return True, None


def validate_username(username: str) -> Tuple[bool, Optional[str]]:
    """Validate username"""
    if len(username) < 3:
        return False, "Username must be at least 3 characters long"
    
    if len(username) > 50:
        return False, "Username must be less than 50 characters"
    
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return False, "Username can only contain letters, numbers, and underscores"
    
    return True, None


def validate_phone(phone: str) -> bool:
    """Validate phone number"""
    pattern = r'^\+?1?\d{9,15}$'
    return bool(re.match(pattern, phone))


def validate_url(url: str) -> bool:
    """Validate URL"""
    pattern = r'^https?://[^\s/$.?#].[^\s]*$'
    return bool(re.match(pattern, url))


def validate_product_name(name: str) -> Tuple[bool, Optional[str]]:
    """Validate product name"""
    if not name or len(name.strip()) < 2:
        return False, "Product name must be at least 2 characters long"
    
    if len(name) > 255:
        return False, "Product name must be less than 255 characters"
    
    return True, None


def validate_features(features: list) -> Tuple[bool, Optional[str]]:
    """Validate features list"""
    if not features or len(features) == 0:
        return False, "At least one feature is required"
    
    if len(features) > 20:
        return False, "Maximum 20 features allowed"
    
    for feature in features:
        if not feature or len(feature.strip()) < 2:
            return False, "Each feature must be at least 2 characters long"
    
    return True, None


def sanitize_string(text: str) -> str:
    """Sanitize string by removing HTML tags and special characters"""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text.strip()


def validate_price(price: float) -> Tuple[bool, Optional[str]]:
    """Validate price"""
    if price < 0:
        return False, "Price cannot be negative"
    
    if price > 1000000:
        return False, "Price is too high"
    
    return True, None