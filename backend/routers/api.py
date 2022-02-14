from fastapi import APIRouter
from routers import root, login, logout, clubs, members

api_router = APIRouter()
api_router.include_router(root.router, tags=["root"])
api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(logout.router, prefix="/logout", tags=["logout"])
api_router.include_router(clubs.router, prefix="/clubs", tags=["clubs"])
api_router.include_router(members.router, prefix="/members", tags=["members"])