import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors: string[] = [];
  user: User = new User();

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmit(user: User) {
    this.auth.login(user)
      .subscribe(loggedUser => {
        this.router.navigateByUrl('products');
      }, error => {
        console.log(`an error occurred`, error);
        this.handleErrors(error.error);
      });
  }

  private handleErrors(errors: string[] | Error | string): void {
    if (Array.isArray(errors)) {
      this.errors = errors;
    } else if (typeof errors === 'string') {
      this.errors = [errors];
    } else {
      this.errors = [errors.message];
    }
  }

}
