from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi import APIRouter, status
from core.config import settings

router = APIRouter()

@router.get("/")
def logout(response: HTMLResponse):
  response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
  response.delete_cookie(key='access_token')
  return response