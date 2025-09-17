import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { EditProduct } from './pages/edit-product/edit-product';
import { NewProduct } from './pages/new-product/new-product';
import { Layout } from './pages/layout/layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', // TODO: Caso entre em uma rota vazia e o usuário esteja autenticado, será redirecionado para a rota de /products. Caso não esteja vai redirecionar para a rota de /login
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
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
