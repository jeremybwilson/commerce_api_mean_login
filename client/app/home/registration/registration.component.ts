import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationErrors: string[] = [];
  user: User = new User();

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmit(user: User): void {
    this.auth.register(user)
    .subscribe(
      createdUser => {
        // console.log('created', createdUser);
        this.router.navigateByUrl('products');
      },
      error => {
        console.log('error', error);
        this.registrationErrors = error.error;
      }
    );
  }
}
