import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module'
import { NgxMatIntlTelInputModule  } from "ngx-mat-intl-tel-input";
import { AuthComponents, AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        ...AuthComponents
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        MaterialModule,
        NgxMatIntlTelInputModule
    ]
})
export class AuthModule {}