import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient } from '@angular/common/http';
interface ParentItemData {
  id: number;
  club_members: ChildrenItemData[];
  club_name: string;
  club_address: string;
  expand: boolean;
}

interface ChildrenItemData {
  id: number;
  name: string;
  age: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private http: HttpClient,
  ) { }
  clubs: ParentItemData[] = [];
  members: ChildrenItemData[] = [];
  selected: any = {
    club_name: "",
    club_address: "",
    name: "",
    age: 0,
    type: "",
    index: -1,
    memberIndex: -1
  };
  isVisible = false;
  isCreate = false;
  isLoading = false;
  editForm: FormGroup;
  createForm: FormGroup;
  createMemberForm: FormGroup;
  error: string;

  ngOnInit(): void {
    this.getClubs()
    this.editForm = this.fb.group({
      name: [null, [Validators.required]],
      address: [null, []],
      age: [null, []]
    });
    this.createForm = this.fb.group({
      club_name: [null, [Validators.required]],
      club_address: [null, [Validators.required, Validators.minLength(3)]],
    });
    this.createMemberForm = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]]
    });
  }
  
  getClubs(): void{
    this.http.get(`${location.origin}/api/`).subscribe((data:any) => {
      this.clubs = data.clubs.map((i:ParentItemData) => ({...i, expand: false}))
    })
  }

  showEditModal(type: string, data: any, index: number, memberIndex: number = -1): void{
    this.selected = {...data, type, index, memberIndex}
    if(type === "club"){
      this.editForm.get('name')!.setValue(data.club_name);
      this.editForm.get('address')!.setValue(data.club_address);
      this.editForm.get('address')!.setValidators([Validators.required, Validators.minLength(3)]);
    }else{
      this.editForm.get('name')!.setValue(data.name)
      this.editForm.get('age')!.setValue(data.age)
      this.editForm.get('age')!.setValidators([Validators.required]);
    }
    this.isVisible = true;
  }

  showCreateModal() : void {
    this.isCreate = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isCreate = false;
    this.isLoading = false;
    this.createForm.reset()
    this.createMemberForm.reset() 
    this.members = [] 
    this.error = ""
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.clubs, event.previousIndex, event.currentIndex);
  }

  dropInner(index: number, event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.clubs[index].club_members, event.previousIndex, event.currentIndex);
  }

  update(): void {
    if (this.editForm.valid) {
      this.error = ""
      this.isLoading = true;
      if(this.selected.type === "club"){
        this.updateClub()
      }else{
        this.updateMember()
      }
      this.isLoading = false;
    } else {
      Object.values(this.editForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateClub(): void {
    const updateData = {
      club_name: this.editForm.value.name,
      club_address: this.editForm.value.address 
    }
    this.http.put(`${location.origin}/api/clubs/${this.selected.id}/`, updateData).subscribe(data =>{
      this.clubs[this.selected.index] = {...this.clubs[this.selected.index], ...updateData}
      this.notification.create(
        "success",
        `Club ${this.editForm.value.name} updated successfully!`,
        ""
      );
      this.isVisible = false;
    },
    (error: any) =>{
      this.notification.create(
        "error",
        `Server error, please try again later!`,
        ""
      )
    })
  }

  updateMember(): void {
    const updateData = {
      name: this.editForm.value.name,
      age: this.editForm.value.age 
    }
    this.http.put(`${location.origin}/api/clubs/${this.selected.club_id}/members/${this.selected.id}/`, updateData).subscribe(data =>{
      this.clubs[this.selected.index].club_members[this.selected.memberIndex] = {...this.clubs[this.selected.index].club_members[this.selected.memberIndex], ...updateData}
      this.notification.create(
        "success",
        `Member ${this.editForm.value.name} updated successfully!`,
        ""
      );
      this.isVisible = false;
    },
    (error: any) =>{
      if(error.error.detail[0].type === "value_error.number.not_gt"){
        this.error = "The age must be greater than 18 years old!"
        return
      }
      this.notification.create(
        "error",
        `Server error, please try again later!`,
        ""
      )
    })
  }

  createClub(): void {
    if (this.createForm.valid) {
      this.error = ""
      this.isLoading = true;
      const postData = {
        ...this.createForm.value,
        club_members: this.members,
      }
      this.http.post(`${location.origin}/api/clubs/`, postData).subscribe(
        (data: any) =>{
        this.clubs.push({...data, expand: false})
        this.createForm.reset()
        this.createMemberForm.reset()
        this.members = []
        this.isCreate = false;
        this.notification.create(
          "success",
          `Club ${postData.club_name} created successfully!`,
          ""
        )},
        (error:any) => {
          if(error.error.detail[0].type === "value_error.number.not_gt"){
            this.error = "The club member's age must be greater than 18 years old."
            return
          }
          this.notification.create(
            "error",
            `Server error, please try again later!`,
            ""
          )
        }
      )
      this.isLoading = false;
    } else {
      Object.values(this.createForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createMember(): void {
    if (this.createMemberForm.valid) {
      this.members.push(this.createMemberForm.value)
      this.createMemberForm.reset();
    } else {
      Object.values(this.createMemberForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  deleteMember(index: number): void {
    this.members.splice(index, 1);
  }
}
