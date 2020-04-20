import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Register } from './register/register';
import { Login } from './login/login';
import { OTPData } from './otp-dialog/otp';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(resiter: Register): Observable<Register> {
    return this.http.post<Register>(`${baseUrl}/user/registration`, resiter);
  }

  loginUser(login: Login): Observable<Login> {
    return this.http.post<Login>(`${baseUrl}/user/login`, login);
  }

  OTPSend(otp: OTPData): Observable<OTPData> {
    return this.http.post<OTPData>(`https://powerful-badlands-84912.herokuapp.com/api/otp`, otp);
  }

  OTPVerify(otp: OTPData): Observable<OTPData> {
    return this.http.post<OTPData>(`https://powerful-badlands-84912.herokuapp.com/api/otp/verify`, otp);
  }

}
