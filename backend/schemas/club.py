from pydantic import BaseModel, Field, EmailStr
from .member import MemberCreate, MemberBase, Member

# Shared properties
class ClubBase(BaseModel):
    club_name: str | None
    club_address: str | None = Field(
        None, title="The address of the club", min_length=3, max_length=300
    )

# Properties to receive on club creation
class ClubCreate(ClubBase):
    club_name: str
    club_address: str
    club_members: list[MemberCreate] 

# Properties to receive on club update
class ClubUpdate(ClubBase):
    club_name: str
    club_address: str
    
# Properties properties stored in DB
class ClubInDB(ClubBase):
    id: int
    club_name: str
    club_address: str | None = Field(
        None, title="The address of the club", min_length=3, max_length=300
    )
    club_members: list[Member]


# Properties to return to client
class Club(ClubInDB):
    pass
