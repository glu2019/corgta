from datetime import timedelta
from fastapi import Depends, APIRouter, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from schemas.base import Token
from core.security import create_access_token
from core.config import settings
from dependencies import get_authenticated_user

router = APIRouter()

@router.post("/", response_model=Token)
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    print("hello")
    user = get_authenticated_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token_expires = timedelta(minutes=settings.JWT_AUTH.get("JWT_ACCESS_TOKEN_EXPIRE_MINUTES"))
    access_token = create_access_token(
        data={"username": user.username, "email": user.email}, expires_delta=access_token_expires
    )

    response.set_cookie(key="access_token", value=f"Bearer {access_token}")
    return {"access_token": access_token, "token_type": "bearer"}