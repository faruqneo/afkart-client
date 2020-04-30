import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../validators/validators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  categories: any = [];
  products: Array<Product> = []; 

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;

  addButton: boolean = false;
  productFrom: FormGroup;
  tags: Array<string> = [];
  files: Array<{ data: object, inProgress: boolean, progress: number }> = [];
  images: Array<string> = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  loading: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fromBulider: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productFrom = this.fromBulider.group({
      title: ['', [Validators.required, noWhitespaceValidator]],
      vendor: ['', [Validators.required, noWhitespaceValidator]],
      category: ['', [Validators.required, noWhitespaceValidator]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, noWhitespaceValidator]]
    })
    this.getCategory();
    this.getProduct();
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
          console.log('event.body', event.body.link);
          this.images.push(event.body.link)
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
      console.log("file upload fun returns ");
      console.log(this.uploadFile(file))
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++)
        this.files.push({ data: fileUpload.files[index], inProgress: false, progress: 0 });
      this.uploadFiles();
    };
    fileUpload.click();
  }

  getCategory() {
    this.productService.getCategory().subscribe((res) => this.categories = res);
    console.log('category', this.categories);
  }

  // addNewitemcategory = (term) => ({ id: term, category: term });
  // [addTag]="addNewitemdistrict"

  productAdd() {
    const data: Product = { ...this.productFrom.value, tags: this.tags, files: this.images }
    console.log("---------------------")
    console.log(data);
    console.log("---------------------")

    this.productService.addProduct(data)
      .subscribe((res) => {
        console.log(res);
        this.toastr.success('Your Product Added Successfully');
        this.router.navigate(['product'])
      })
  }

  getProduct(): void{
    this.productService.getProduct().subscribe(data => {
      this.products = data;
      this.loading = false;
    });
    console.log('products', this.products);
  }

}
