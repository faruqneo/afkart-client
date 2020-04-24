import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../validators/validators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;

  addButton: boolean = false;
  productFrom: FormGroup;
  tags: Array<string> = [];
  files: Array<any> = []
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fromBulider: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.productFrom = this.fromBulider.group({
      title: ['', [Validators.required, noWhitespaceValidator]],
      vendor: ['', [Validators.required, noWhitespaceValidator]],
      category: ['', [Validators.required, noWhitespaceValidator]],
      price: ['', [Validators.required, noWhitespaceValidator]],
      description: ['', [Validators.required, noWhitespaceValidator]]
    })
  }

  addToggle(): void {
    this.addButton = !this.addButton
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim())
      this.tags.push(value.trim());


    // Reset the input value
    if (input)
      input.value = '';

  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0)
      this.tags.splice(index, 1);

  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.productService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  productAdd() {
    const data: Product = { ...this.productFrom.value, tags: this.tags, files: this.files }
    console.log(data)
  }


}
