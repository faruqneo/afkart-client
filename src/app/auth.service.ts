import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Register } from './register/register';
import { Login } from './login/login';
import { OTPData } from './otp-dialog/otp';

const { baseUrl, OTPUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(resiter: Register): Observable<Register> {
    return this.http.post<Register>(`${baseUrl}/user/registration`, resiter);
  }

  loginUser(login: Login): Observable<Login> {
    return this.http.post<Login>(`${baseUrl}/user/login`, login)
      .pipe(tap(data => {
        console.log(data);
        localStorage.setItem('accessToken', data.accessToken)
      }));
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken') !== null
  }

  logout() {
    localStorage.removeItem('accessToken')
  }

  OTPSend(otp: OTPData): Observable<OTPData> {
    return this.http.post<OTPData>(`${OTPUrl}/api/otp`, otp);
  }

  OTPVerify(otp: OTPData): Observable<OTPData> {
    return this.http.post<OTPData>(`${OTPUrl}/api/otp/verify`, otp);
  }

}
