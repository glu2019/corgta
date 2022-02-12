import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import snakecaseKeys from 'snakecase-keys';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';


export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));
    return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginFormData: FormGroup;
  parentErrorStateMatcher: ParentErrorStateMatcher;
  hidePassword: Boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.loginFormData = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });

    this.parentErrorStateMatcher = new ParentErrorStateMatcher();
    this.hidePassword = true;
  }

  clearField(formControlName: string) {
    this.loginFormData.get(formControlName)?.reset();
  }

  login(event:any) {
    event.preventDefault()
    this.http.post(
      location.origin + '/cseye-rest/auth/',
      snakecaseKeys(this.loginFormData.value)
    )
      .subscribe(
        data => {
          this.router.navigate(['/'])
        },
        err => {
          this.loginFormData.setErrors(err.error);
        }
      );
    
  }
}