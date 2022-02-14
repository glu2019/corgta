import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    LoginComponent, 
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NzIconModule
  ]
})
export class AuthModule { }
