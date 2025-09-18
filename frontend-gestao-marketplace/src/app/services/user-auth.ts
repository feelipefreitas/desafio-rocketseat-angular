import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  getUserToken() {
    // TODO: Recuperar o token do localstorage
    return 'TOKEN';
  }
}
