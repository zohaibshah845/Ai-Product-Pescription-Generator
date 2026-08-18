from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ToneEnum(str, Enum):
    PROFESSIONAL = "professional"
    CASUAL = "casual"
    LUXURY = "luxury"
    FUN = "fun"
    PERSUASIVE = "persuasive"
    EMOTIONAL = "emotional"
    TECHNICAL = "technical"

class LengthEnum(str, Enum):
    SHORT = "short"
    MEDIUM = "medium"
    LONG = "long"
    EXTRA_LONG = "extra_long"

class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    category: str = Field(..., min_length=1, max_length=100)
    key_features: List[str] = Field(..., min_items=1)
    target_audience: str = Field(..., min_length=1)
    additional_info: Optional[str] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    category: str
    key_features: List[str]
    target_audience: str
    additional_info: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class DescriptionRequest(BaseModel):
    product_id: Optional[int] = None
    product_name: str
    category: str
    key_features: List[str]
    target_audience: str
    tone: ToneEnum = ToneEnum.PROFESSIONAL
    length: LengthEnum = LengthEnum.MEDIUM
    additional_info: Optional[str] = None
    template_id: Optional[int] = None
    include_seo: bool = True
    include_bullets: bool = True
    language: str = "en"

class DescriptionResponse(BaseModel):
    id: Optional[int] = None
    product_id: Optional[int] = None
    title: str
    content: str
    bullet_points: Optional[List[str]] = None
    seo_keywords: Optional[List[str]] = None
    tone: str
    length: str
    is_favorite: bool = False
    generated_at: datetime
    
    class Config:
        from_attributes = True

class BulkDescriptionRequest(BaseModel):
    products: List[DescriptionRequest]
    generate_parallel: bool = True

class BulkDescriptionResponse(BaseModel):
    total_generated: int
    descriptions: List[DescriptionResponse]
    processing_time: float