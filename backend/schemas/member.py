from pydantic import BaseModel, Field

# Shared properties
class MemberBase(BaseModel):
    name: str | None
    age: int | None

# Properties to receive on member creation
class MemberCreate(MemberBase):
    name: str
    age: int = Field(None, gt=17, description="The age must be greater than 18 years old.")

# Properties to receive on member update
class MemberUpdate(MemberBase):
    club_id: int

# Properties properties stored in DB
class MemberInDB(MemberBase):
    id: int
    name: str
    age: int 
    club_id: int

# Properties to return to client
class Member(MemberInDB):
    pass