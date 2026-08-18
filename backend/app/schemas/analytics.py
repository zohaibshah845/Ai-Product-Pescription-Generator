from pydantic import BaseModel
from typing import Optional, Dict, List
from datetime import datetime

class AnalyticsEventCreate(BaseModel):
    event_type: str
    product_id: Optional[int] = None
    team_id: Optional[int] = None
    metadata: Optional[Dict] = None

class AnalyticsEventResponse(BaseModel):
    id: int
    user_id: int
    event_type: str
    product_id: Optional[int]
    team_id: Optional[int]
    metadata: Optional[Dict]
    created_at: datetime
    
    class Config:
        from_attributes = True

class DashboardStatsResponse(BaseModel):
    total_generations: int
    recent_generations: int
    total_products: int
    total_teams: int
    average_tokens: float
    daily_metrics: List[Dict]
    usage_distribution: List[Dict]
    top_products: List[Dict]
    
    class Config:
        from_attributes = True