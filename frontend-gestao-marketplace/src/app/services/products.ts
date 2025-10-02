import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INewProductRequest } from '../interfaces/new-products-request';
import { Observable } from 'rxjs';
import { INewProductResponse } from '../interfaces/new-product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _httpClient= inject(HttpClient);

  saveProduct(product: INewProductRequest ): Observable <INewProductResponse>{
    return this._httpClient.post<INewProductResponse>('http://localhost:3000/api/products', product);
  }
}
