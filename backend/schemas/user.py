from pydantic import BaseModel, EmailStr

class User(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None

class UserInDB(User):
    id: int
    hashed_password: str
