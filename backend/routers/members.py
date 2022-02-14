# from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from schemas import base, member, user
from dependencies import get_current_user, getMembers

router = APIRouter()


@router.get("/", response_model=list[member.Member])
def read_members(
    data: base.Data = Depends(getMembers),
    skip: int = 0,
    limit: int = 100,
    current_user: user.User = Depends(get_current_user),
):
    """
    Retrieve all members.
    """
    return data.get("members")


@router.post("/", response_model=list[member.Member])
def create_member(
    *,
    data:any = Depends(getMembers),
    member_in: member.MemberCreate,
    current_user: user.User = Depends(get_current_user),
):
    """
    Create new member.
    """
    member_id = len(data.get("members")) + 1
    member_in_db = member.MemberInDB(**member_in.dict(), id=member_id)
    data.get("members").append(member_in_db.dict())
   
    return data.get("members")


@router.put("/{id}/", response_model=member.Member)
def update_member(
    *,
    data:any = Depends(getMembers),
    id: int,
    member_in: member.MemberUpdate,
    current_user: user.User = Depends(get_current_user),
):
    """
    Update a member.
    """
    member_in_db = member.MemberInDB(**member_in.dict(), id=id).dict()

    return member_in_db


@router.get("/{id}/", response_model=member.Member)
def read_member(
    *,
    data:any = Depends(getMembers),
    id: int,
    current_user: user.User = Depends(get_current_user),
):
    """
    Get member by ID.
    """
    members = data.get("members")

    if not members[id-1]:
        raise HTTPException(status_code=404, detail="Member not found")
    return members[id-1]