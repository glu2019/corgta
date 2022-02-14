from fastapi import Depends, APIRouter, status 
from schemas import base, user
from dependencies import getData, get_current_user

router = APIRouter()

@router.get("/", response_model=base.Data, status_code=status.HTTP_200_OK)
async def root( 
    data: base.Data = Depends(getData),
    skip: int = 0,
    limit: int = 100,
    current_user: user.User = Depends(get_current_user)
):
    return data