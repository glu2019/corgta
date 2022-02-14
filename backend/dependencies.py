

from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from core.oauth2 import OAuth2PasswordBearerWithCookie
from core.config import settings
from core.security import verify_password
from schemas import user
import json

reusable_oauth2 = OAuth2PasswordBearerWithCookie(
    tokenUrl=f"{settings.API_VERSION}/login"
)

def get_user(username: str):
    with open("fake_db/users.json") as file:
        fake_users = json.load(file)
    file.close()
    if username in fake_users:
        user_dict = fake_users[username]
        return user.UserInDB(**user_dict)

def get_authenticated_user(username: str, password: str):
    user = get_user(username)
    # if not user:
    #     return False
    # if not verify_password(password, user.hashed_password):
    #     return False
    return user   

def get_current_user(token: str = Depends(reusable_oauth2)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_AUTH.get("JWT_SECRET_KEY"), algorithms=[settings.JWT_AUTH.get("ALGORITHM")])
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(username)
    if user is None:
        raise credentials_exception
    return user

def getData():
    with open("fake_db/clubs.json") as file:
        data = json.load(file)
    file.close()
    return data

def getMembers():
    with open("fake_db/members.json") as file:
        members = json.load(file)
    file.close()
    return members