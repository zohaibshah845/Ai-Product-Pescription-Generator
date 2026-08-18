from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse
from app.utils.database import get_db
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/", response_model=ProductResponse)
async def create_product(product_data: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(
        user_id=1,
        name=product_data.name,
        category=product_data.category,
        key_features=product_data.key_features,
        target_audience=product_data.target_audience,
        additional_info=product_data.additional_info
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/", response_model=List[ProductResponse])
async def get_products(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.delete("/{product_id}")
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}