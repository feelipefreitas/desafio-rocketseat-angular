import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserAuthService } from "../services/user-auth";
import { UserService } from "../services/user";
import { firstValueFrom } from "rxjs";

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  // Token inexistente, permitir acesso ao login
  const HAS_TOKEN = _userAuthService.getUserToken();
  if(!HAS_TOKEN) return true;

  try {
    await firstValueFrom(_userService.validateUser());

    // Token válido, redirecionar para /products
    return _router.navigate(['/products']);
  } catch(error) {
    // Token inválido, permitir acesso ao login
    return true;
  }
};
