import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { confirmPasswordValidator, noWhitespaceValidator } from '../validators/validators';
import { takeUntil } from 'rxjs/internal/operators';
import { MatDialog } from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';

export interface DialogData {
  otp: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  otp: any;

  registerForm: FormGroup;
  @ViewChild('phone') phone : any;


  constructor(
    private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, noWhitespaceValidator, Validators.pattern('^[a-zA-Z ]*$')]],
      last_name: ['', [Validators.required, noWhitespaceValidator, Validators.pattern('^[a-zA-Z ]*$')]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{9,}')]],
      terms: ['', Validators.required],
      cpassword: ['', [Validators.required, confirmPasswordValidator]]
  });

  // Update the validity of the 'passwordConfirm' field
  // when the 'password' field changes
  // this.registerForm.get('password').valueChanges
  //     .pipe(takeUntil(this._unsubscribeAll))
  //     .subscribe(() => {
  //         this.registerForm.get('cpassword').updateValueAndValidity();
  //     });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OtpDialogComponent, {
      width: '30%',
      data: {name: this.otp}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.otp = result;
    });
  }

  

  register() {

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // this.showOtpComponent = true;
      // this.toastr.success("Thank you for registering with us!");
      // this.router.navigate(['/login']);

        // let params = {
        //     ...this.registerForm.value, 
        //     phone : this.phone.phoneNumber,
        //     country_code : this.phone.selectedCountry.dialCode
        // }
        // this.authService.registerUser(params)
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((res) => {
        //         if (!res.isSucceed) {
        //             this.toastr.error(res.msg)
        //             return;
        //         }
        //         this.toastr.success("Thank you for registering with us!");
        //         this.router.navigate(['/auth/login']);
        //     }, (error) => { console.log(error) });
    }
}

}
