from fastapi import APIRouter, Depends, HTTPException
from schemas import base, club, user, member
from dependencies import get_current_user, getData, getMembers
import json

router = APIRouter()


@router.get("/", response_model=list[club.Club])
def read_clubs(
    data: base.Data = Depends(getData),
    skip: int = 0,
    limit: int = 100,
    current_user: user.User = Depends(get_current_user),
):
    """
    Retrieve all clubs.
    """
    return data.get("clubs")


@router.post("/", response_model=club.Club)
def create_club(
    *,
    members:any = Depends(getMembers),
    data: base.Data = Depends(getData),
    club_in: club.ClubCreate,
    current_user: user.User = Depends(get_current_user),
):
    """
    Create new club.
    """
    club_id = len(data.get("clubs")) + 1
    club_members_in = []
    for member_in in club_in.club_members:
        member_in_db = member.MemberInDB(**member_in.dict(), id = len(members.get("members")) + 1, club_id = club_id)
        club_members_in.append(member_in_db.dict())
        members.get("members").append(member_in_db.dict())
    
    club_in_db = club.ClubInDB(
        id=club_id, 
        club_name = club_in.club_name, 
        club_address = club_in.club_address, 
        club_members = club_members_in
    )
    data.get("clubs").append(club_in_db.dict())

    with open('fake_db/members.json', 'w') as file:
        json.dump(members, file)
        file.close()
    with open('fake_db/clubs.json', 'w') as file:
        json.dump(data, file)
        file.close()

    return club_in_db.dict()


@router.put("/{id}/", response_model=club.Club)
def update_item(
    *,
    data:base.Data = Depends(getData),
    id: int,
    club_in: club.ClubUpdate,
    current_user: user.User = Depends(get_current_user),
):
    """
    Update a club.
    """
    club_in_db =club.ClubInDB(
        id=id, 
        club_name = club_in.club_name, 
        club_address = club_in.club_address, 
        club_members = data.get("clubs")[id-1].get("club_members")
    )
    data.get("clubs")[id-1] = club_in_db.dict()
    with open('fake_db/clubs.json', 'w') as file:
        json.dump(data, file)
        file.close()
    return data.get("clubs")[id-1]


@router.put("/{club_id}/members/{member_id}/", response_model=club.Club)
def update_item(
    *,
    data:base.Data = Depends(getData),
    members: any = Depends(getMembers),
    club_id: int,
    member_id: int,
    member_in: member.MemberCreate,
    current_user: user.User = Depends(get_current_user),
):
    """
    Update a member of a club.
    """
    member_in_db = member.MemberInDB(**member_in.dict(), id = member_id, club_id = club_id)
    members.get("members")[member_id-1] = member_in_db.dict()
    index = 0
    for m in data.get("clubs")[club_id-1].get("club_members"):
        index = index + 1
        if m.get("id") == member_id:  
            break
    data.get("clubs")[club_id-1].get("club_members")[index-1] = member_in_db.dict() 
    with open('fake_db/members.json', 'w') as file:
        json.dump(members, file)
        file.close()
    with open('fake_db/clubs.json', 'w') as file:
        json.dump(data, file)
        file.close()


    return data.get("clubs")[club_id-1]