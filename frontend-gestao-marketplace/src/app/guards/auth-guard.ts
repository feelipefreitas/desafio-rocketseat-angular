import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth';
import { inject } from '@angular/core';
import { UserService } from '../services/user';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const userAuthService = inject(UserAuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  // Não possui token no localstorage
  const HAS_TOKEN = userAuthService.getUserToken();
  if(!HAS_TOKEN) {
    return router.navigate(['/login']);
  }

  try {
    // Tenta validar o token no backend
    await firstValueFrom(userService.validateUser());

    // Se o usuário está validado e a rota que ele está tentando acessar é a de login,
    // ele é redirecionado para a página de produtos.
    if(state.url === '/login') {
      return router.navigate(['/products']);
    }

    // Se o token é válido e a rota não é a de login, permite o acesso para a rota desejada.
    return true;
  } catch (error) {
    // Se a requisição de validação falhar (token inválido), redireciona para o login
    return router.navigate(['/login']);
  }
};
