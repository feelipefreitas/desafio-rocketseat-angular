import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserAuthService } from "../services/user-auth";

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  // Token inexistente, redireciona para tela de login
  const HAS_TOKEN = _userAuthService.getUserToken();
  if(!HAS_TOKEN) return true;

  try {
    await firstValueFrom(_userService.validateUser());

    // token valido, redireciona para o /products
    return _router.navigate(['/products']);
  } catch(error) {

    // Token inválido, redireciona para tela de login
    return true;
  }
};