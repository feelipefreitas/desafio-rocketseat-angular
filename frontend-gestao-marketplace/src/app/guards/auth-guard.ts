import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/user-auth";
import { firstValueFrom } from "rxjs";

export const authGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  //nao possui token no localStorage

  const HAS_TOKEN = _userAuthService.getUserToken();
  if(!HAS_TOKEN){
    return _router.navigate(['/login']);
  }

  try {
    //tenta validar o token no backend
    await firstValueFrom(_userService.validateUser());

    //se o usuario esta validado e a rota que ele está tentando acessar é a de login
    //ele é redirecionado para a pagina de produtos
    if(state.url === '/login'){
      return _router.navigate(['/products']);
    }

    //se o token é válido e a rota não é a de login, permite o acesso para a rota desejada
    return true;
  } catch (error) {
    //se a requisição de validação falhar (token invalido) redireciona para o login
    return _router.navigate(['/login']);
  }
};
