import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';
import { Observable } from 'rxjs';
import { ILoginSuccessResponse } from '../interfaces/login-success-response';
import { INewProductRequest } from '../interfaces/new-product-request';
import { INewProductResponse } from '../interfaces/new-product-response';
import { IProductsResponse } from '../interfaces/products-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);

  validateUser(): Observable<IAuthSuccessResponse> {
    return this._httpClient.get<IAuthSuccessResponse>('http://localhost:3000/api/protected');
  }

  login(email: string, password: string): Observable<ILoginSuccessResponse> {
    return this._httpClient.post<ILoginSuccessResponse>('http://localhost:3000/api/users/login', {
      email,
      password,
    });
  }

  addNewProduct(product: INewProductRequest): Observable<INewProductResponse> {
    return this._httpClient.post<INewProductResponse>('http://localhost:3000/api/products', product);
  }

  getProducts(): Observable<IProductsResponse> {
    return this._httpClient.get<IProductsResponse>('http://localhost:3000/api/products');
  }
}
