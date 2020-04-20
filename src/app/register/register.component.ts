import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { confirmPasswordValidator, noWhitespaceValidator } from '../validators/validators';
import { takeUntil } from 'rxjs/internal/operators';
import { MatDialog } from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  otp: any;

  registerForm: FormGroup;
  @ViewChild('phoneNo') phoneNo: any;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, noWhitespaceValidator, Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, noWhitespaceValidator, Validators.pattern('^[a-zA-Z ]*$')]],
      phoneNo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{9,}')]],
      terms: ['', Validators.required],
      cpassword: ['', [Validators.required, confirmPasswordValidator]]
    });
  }

  openDialog(): void {

    // console.log(this.registerForm.value);
    this.otp = { "store": "afkart.com", "number": this.registerForm.value.phoneNo, "otp": "" }
    // this.authService.OTPSend(this.otp).subscribe(data => console.log(data))

    const dialogRef = this.dialog.open(OtpDialogComponent, {
      width: '30%',
      data: { "store": "afkart.com", "number": this.registerForm.value.phoneNo, "otp": "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.registerForm.value);
      console.log(result);
      this.otp = result;

      if (result) {
        this.toastr.success("Thank you for registering with us!");
        this.router.navigate(['/login']);
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
      //     phoneNo : this.phoneNo.phoneNoNumber,
      //     country_code : this.phoneNo.selectedCountry.dialCode
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
