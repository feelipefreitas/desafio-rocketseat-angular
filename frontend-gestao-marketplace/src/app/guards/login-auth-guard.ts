import { CanActivateFn, Router } from "@angular/router";
import { UserAuthService } from "../services/user-auth";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserService } from "../services/user";

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  // token inexistente permitir acesso ao login
  const HAS_TOKEN = _userAuthService.getUserToken();
  if(!HAS_TOKEN) return true;

  try {
    await firstValueFrom(_userService.validateUser());

    //token valido, redirecionar para /products
    return _router.navigate(['/products'])
  } catch (error) {
    // token invalido, permitir acesso ao login
    return true;

  }

};
