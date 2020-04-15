import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}')]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.toastrService.success('login Success');
      // this.authService.login(this.loginForm.value)
      //   .pipe(takeUntil(this._unsubscribeAll))
      //   .subscribe((res) => {
      //     if (!res.isSucceed) {
      //       this.toastrService.error(res.msg);
      //       return;
      //     }
          
      //     this.router.navigate(['']);
      //   }, (error) => { console.log(error) });
    }
  }

}
