import { Component } from '@angular/core';
import { Login } from "./pages/login/login";
import { Header } from "./components/header/header";
import { Products } from "./pages/products/products";
import { EditProduct } from "./pages/edit-product/edit-product";
import { NewProduct } from "./pages/new-product/new-product";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
