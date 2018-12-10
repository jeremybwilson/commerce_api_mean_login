import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  isLoggedIn = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    // this.isLoggedIn = this.auth.isAuthed;
  }

  logout() {
    this.auth.logout()
      .subscribe(() => {
        console.log('successfully logged out');
        this.router.navigateByUrl('/');
      });
  }

}
