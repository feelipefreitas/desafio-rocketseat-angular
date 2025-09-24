import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products';
import { INewProductRequest } from '../../interfaces/new-product-request';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {
  successMessage = '';
  productImageBase64 = '';
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  private readonly _productsService = inject(ProductsService);
  private readonly _router = inject(Router);

  saveProduct() {
    console.log('productForm', this.productForm);

    if(this.productForm.invalid || !this.productImageBase64) return;

    const newProduct: INewProductRequest = {
      title: this.productForm.value.title as string,
      description: this.productForm.value.description as string,
      price: this.productForm.value.price as number,
      category: this.productForm.value.category as string,
      imageBase64: this.productImageBase64,
    };

    this._productsService.saveProduct(newProduct).pipe(take(1)).subscribe({
      next: (response) => {
        this.successMessage = response.message;
      },
    });
  }

  cancel() {
    // Botão de cancelar
    this._router.navigate(['/products']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length > 0) {
      const file = input.files[0];

      this.convertFileToBase64(file);
    }
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imageBase64 = e.target.result as string;

      this.productImageBase64 = imageBase64;

      console.log(imageBase64)
    }

    reader.onerror = (_) => {
      this.productImageBase64 = '';
    }
    
    reader.readAsDataURL(file);
  }
}
