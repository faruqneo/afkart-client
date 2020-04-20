import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxMatIntlTelInputModule } from "ngx-mat-intl-tel-input";
import { NgOtpInputModule } from 'ng-otp-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { MetarialModule } from './metarial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OtpDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    NgxMatIntlTelInputModule,
    NgOtpInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MetarialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
