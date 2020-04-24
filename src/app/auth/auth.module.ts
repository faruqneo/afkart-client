import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxMatIntlTelInputModule  } from "ngx-mat-intl-tel-input";
import { AuthComponents, AuthRoutingModule } from './auth-routing.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { MetarialModule } from '../metarial.module';

@NgModule({
    declarations: [
        ...AuthComponents
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        MetarialModule,
        NgxMatIntlTelInputModule,
        NgOtpInputModule
    ]
})
export class AuthModule {}