import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {
  imageBase64 = '';
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  saveProduct() {
    console.log('Formulário:', this.productForm.value);
  }

  onFileSelected(event: Event) {
    console.log(event)
  }
}
