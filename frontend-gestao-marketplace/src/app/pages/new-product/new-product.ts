import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { INewProductRequest } from '../../interfaces/new-product-request';
import { take } from 'rxjs';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {
  successUploadMessage = '';
  imageBase64 = '';
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  private readonly _userService = inject(UserService);

  saveProduct() {
    if(this.productForm.valid && this.imageBase64) {
      const newProduct: INewProductRequest = {
        title: this.productForm.value.title as string,
        price: this.productForm.value.price as number,
        description: this.productForm.value.description as string,
        category: this.productForm.value.category as string,
        imageBase64: this.imageBase64,
      };

      this._userService.addNewProduct(newProduct).pipe(take(1)).subscribe({
        next: (response) => {
          console.log('Produto salvo com sucesso: ', response);
          this.successUploadMessage = response.message;
        },
      });
    }
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
      const base64String = e.target.result as string;

      console.log('Imagem em Base64:', base64String);

      this.imageBase64 = base64String;
    };

    reader.onerror = (error) => {
      console.error('Erro ao ler o arquivo:', error);

      this.imageBase64 = '';
    };

    reader.readAsDataURL(file);
  }
}
