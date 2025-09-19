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

    // Inicia a leitura do arquivo como uma string Base64
    reader.readAsDataURL(file);
  }
}
