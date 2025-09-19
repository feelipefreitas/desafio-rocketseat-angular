import { Component, inject } from '@angular/core';
import { IProductResponse } from '../../interfaces/product-response';
import { UserService } from '../../services/user';
import { take } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  products: IProductResponse[] = [];
  productsListFiltered: IProductResponse[] = [];
  filterForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
  });

  private readonly _userService = inject(UserService);

  ngOnInit() {
    this._userService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {
        this.products = response.data;
        this.productsListFiltered = response.data;
      }
    });
  }

  filterProductsList() {
    const filterTitle = this.filterForm.value.title?.toLowerCase();
    const filterStatus = this.filterForm.value.status?.toLowerCase();

    this.productsListFiltered = this.products.filter(
      (product) => 
        (!filterTitle || product.title.toLowerCase().includes(filterTitle)) && 
        (!filterStatus || product.status.toLowerCase().includes(filterStatus))
    );

    console.log('Lista filtrada', this.productsListFiltered);
  }

  clearFilter() {
    this.productsListFiltered = this.products;
    
    this.filterForm.reset();
    this.filterForm.get('status')?.setValue('');
  }
}
