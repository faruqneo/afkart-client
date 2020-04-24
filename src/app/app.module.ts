import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxMatIntlTelInputModule } from "ngx-mat-intl-tel-input";
import { NgOtpInputModule } from 'ng-otp-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetarialModule } from './metarial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { HttpErrorInterceptor } from './error/http-error.interceptor';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    ProductComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MetarialModule,
    ToastrModule.forRoot(),
    NgxMatIntlTelInputModule,
    NgOtpInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MetarialModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
