import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { IProductResponse } from '../../interfaces/product-response';
import { take } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: IProductResponse[] = [];
  private readonly _productsService = inject(ProductsService);

  ngOnInit() {
    this._productsService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {

        this.products = response.data;
      },
    })
  }
}
