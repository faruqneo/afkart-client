import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
    })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl;

  SERVER_URL: string = environment.uploadUrl;
  constructor(private http: HttpClient) { }

  upload(formData) {
    return this.http.post<any>(this.SERVER_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }

  getCategory() {
    return this.http.get(this.baseUrl + `/category`);
  }

  addProduct(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/product`, data, httpOptions);
  }

  getProduct() {
    return this.http.get(this.baseUrl + `/product`);
  }

  

}
