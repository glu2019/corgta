from pydantic import BaseModel
from .club import Club

class Token(BaseModel):
    access_token: str
    token_type: str

class Data(BaseModel): 
    clubs: list[Club] = []