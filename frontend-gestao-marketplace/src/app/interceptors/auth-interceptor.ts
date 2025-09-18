import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserAuthService } from "../services/user-auth";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const userAuthService = inject(UserAuthService);

  const HAS_TOKEN = userAuthService.getUserToken();
  if(HAS_TOKEN) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${HAS_TOKEN}`),
    });

    return next(newReq);
  }

  return next(req);
}
