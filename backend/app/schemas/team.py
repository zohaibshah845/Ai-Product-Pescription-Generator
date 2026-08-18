from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict
from datetime import datetime

class TeamCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=255)
    description: Optional[str] = None
    logo_url: Optional[str] = None

class TeamUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None
    settings: Optional[Dict] = None

class TeamResponse(BaseModel):
    id: int
    uuid: str
    name: str
    owner_id: int
    description: Optional[str]
    logo_url: Optional[str]
    settings: Dict
    created_at: datetime
    
    class Config:
        from_attributes = True

class TeamMemberAdd(BaseModel):
    user_id: int
    role: str = "member"

class TeamMemberResponse(BaseModel):
    id: int
    team_id: int
    user_id: int
    role: str
    permissions: Dict
    joined_at: datetime
    
    class Config:
        from_attributes = True

class TeamInvitationCreate(BaseModel):
    email: EmailStr
    role: str = "member"

class TeamInvitationResponse(BaseModel):
    id: int
    team_id: int
    email: str
    role: str
    token: str
    status: str
    created_at: datetime
    expires_at: datetime
    
    class Config:
        from_attributes = True