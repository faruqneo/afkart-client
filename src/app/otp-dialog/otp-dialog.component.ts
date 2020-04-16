import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DialogData } from '../register/register.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss']
})
export class OtpDialogComponent implements OnInit {
  otp: any;
  showOtpComponent = false;
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onOtpChange(otp) {
    this.otp = otp;
  }
  setVal(val) {
    this.ngOtpInput.setValue(val);
    this.showOtpComponent = true;
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
