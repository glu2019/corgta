import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed: boolean;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.isCollapsed = false;

  }
  ngOnInit(): void {
  }
   logout() {
    this.http.get(location.origin + '/api/logout/').subscribe(
      data => {
        this.router.navigate(['login']);
      },
      err => {
        this.router.navigate(['login']);
      }
    );
  }
}
