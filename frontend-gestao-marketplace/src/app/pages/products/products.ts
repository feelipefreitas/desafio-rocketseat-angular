import { Component, inject } from '@angular/core';
import { IProductResponse } from '../../interfaces/product-response';
import { UserService } from '../../services/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  products: IProductResponse[] = [];

  private readonly _userService = inject(UserService);

  ngOnInit() {
    this._userService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {
        this.products = response.data;
      }
    });
  }
}
