import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { DialogData } from '../register/register.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss']
})
export class OtpDialogComponent implements OnInit {

  //timer
  sub: Subscription;
  countDown;
  count;

  otp: any;
  showProceedBut = false;
  show = true
  @ViewChild('ngOtpInput') ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder:'',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor(
    public dialogRef: MatDialogRef<OtpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.myTimer()
  }

  onOtpChange(otp) {
    this.otp = otp;
    this.showProceedBut = true;
    this.show = false;
  }
  
  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  // onConfigChange() {
  //   this.otp = null;
  //   setTimeout(() => {
  //   }, 0);
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }

  myTimer() {
    this.count = 5;
    this.countDown = timer(0, 1000)
      .subscribe(x => {
        this.count = this.count - 1;
      });

    this.sub = interval(500)
      .subscribe(x => {
        // console.log(this.count);
        if (this.count === 0) {
          this.show = false;
          this.countDown.unsubscribe();
        }
      });
  }

}
