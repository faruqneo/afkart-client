import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {User} from './model/user';
// import { Register } from './register/register';
// import {  } from './login/login';
import { OTPData } from './otp-dialog/otp';

const { baseUrl, OTPUrl } = environment;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('accessToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserVal(): User {
    return this.currentUserSubject.value;
}

  createUser(user: User) {
    return this.http.post(`${baseUrl}/user/registration`, user, httpOptions);
  }

  loginUser(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/user/login`, {email: email, password: password})
      .pipe(map(data => {
        console.log(data);
          localStorage.setItem('accessToken', data.accessToken);
          this.currentUserSubject.next(data);
      }));
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken') !== null
  }

  logout() {
    localStorage.removeItem('accessToken')
    this.currentUserSubject.next(null);
  }

  OTPSend(otp: OTPData): Observable<OTPData> {
    return this.http.post<OTPData>(`${OTPUrl}/api/otp`, otp);
  }

  OTPVerify(otp: OTPData): Observable<OTPData> {
    return this.http.post<OTPData>(`${OTPUrl}/api/otp/verify`, otp);
  }

}
