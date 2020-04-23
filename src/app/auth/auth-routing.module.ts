import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {OtpDialogComponent} from './otp-dialog/otp-dialog.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            meta: {
                title: 'Login',
                description: 'AF Kart'
            }
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            meta: {
                title: 'Register',
                description: 'AF Kart'
            }
        }
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {}

export const AuthComponents = [
    LoginComponent,
    RegisterComponent,
    OtpDialogComponent
]