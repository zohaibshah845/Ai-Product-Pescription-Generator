from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import time
from datetime import datetime
from app.schemas.product import DescriptionRequest, DescriptionResponse, BulkDescriptionRequest, BulkDescriptionResponse
from app.services.ai_service import AIDescriptionService
from app.utils.database import get_db
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/description", response_model=DescriptionResponse)
async def generate_description(
    request: DescriptionRequest,
    db: Session = Depends(get_db)
):
    """Generate a single product description"""
    try:
        ai_service = AIDescriptionService()
        result = await ai_service.generate_description(
            product_name=request.product_name,
            category=request.category,
            key_features=request.key_features,
            target_audience=request.target_audience,
            tone=request.tone.value,
            length=request.length.value,
            additional_info=request.additional_info,
            language=request.language
        )
        
        return DescriptionResponse(
            title=result["title"],
            content=result["description"],
            bullet_points=result["bullet_points"],
            seo_keywords=result["seo_keywords"],
            tone=request.tone.value,
            length=request.length.value,
            generated_at=datetime.now()
        )
        
    except Exception as e:
        logger.error(f"Error generating description: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/bulk", response_model=BulkDescriptionResponse)
async def generate_bulk_descriptions(
    request: BulkDescriptionRequest,
    db: Session = Depends(get_db)
):
    """Generate multiple product descriptions"""
    start_time = time.time()
    
    results = []
    ai_service = AIDescriptionService()
    
    for product_req in request.products:
        try:
            result = await ai_service.generate_description(
                product_name=product_req.product_name,
                category=product_req.category,
                key_features=product_req.key_features,
                target_audience=product_req.target_audience,
                tone=product_req.tone.value,
                length=product_req.length.value,
                additional_info=product_req.additional_info,
                language=product_req.language
            )
            
            results.append(DescriptionResponse(
                title=result["title"],
                content=result["description"],
                bullet_points=result["bullet_points"],
                seo_keywords=result["seo_keywords"],
                tone=product_req.tone.value,
                length=product_req.length.value,
                generated_at=datetime.now()
            ))
        except Exception as e:
            logger.error(f"Error generating description for {product_req.product_name}: {str(e)}")
            continue
    
    processing_time = time.time() - start_time
    
    return BulkDescriptionResponse(
        total_generated=len(results),
        descriptions=results,
        processing_time=processing_time
    )