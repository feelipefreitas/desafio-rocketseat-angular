import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { EditProduct } from './pages/edit-product/edit-product';
import { NewProduct } from './pages/new-product/new-product';
import { Layout } from './pages/layout/layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    component: Login
  },
  {
    path: '',
    component: Layout,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'products',
        title: 'Produtos',
        component: Products,
      },
      {
        path: 'product/:id',
        title: 'Editar produto',
        component: EditProduct,
      },
      {
        path: 'new-product',
        title: 'Novo produto',
        component: NewProduct,
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];
