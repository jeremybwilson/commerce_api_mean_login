import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './search.pipe';

import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';

import * as fromProducts from './products';
import * as fromServices from './services';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { MessagesComponent } from './messages/messages.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ...fromProducts.components,
    SearchPipe,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.forRoot(),
  ],
  providers: [
    ...fromServices.services,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
