from pydantic import BaseModel
from typing import Optional, Dict, List
from datetime import datetime

class SubscriptionPlanBase(BaseModel):
    name: str
    price: float
    currency: str
    interval: str
    features: Dict
    max_products: int
    max_team_members: int
    max_generations_per_month: int

class SubscriptionPlanCreate(SubscriptionPlanBase):
    stripe_price_id: str

class SubscriptionPlanResponse(SubscriptionPlanBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    plan_id: int
    status: str
    current_period_start: Optional[datetime]
    current_period_end: Optional[datetime]
    cancel_at_period_end: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class PaymentResponse(BaseModel):
    id: int
    amount: float
    currency: str
    status: str
    payment_method: str
    invoice_url: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True