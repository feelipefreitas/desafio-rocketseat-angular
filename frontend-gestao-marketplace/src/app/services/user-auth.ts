import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private readonly TOKEN_KEY = 'auth-token';

  getUserToken(): string | null {

    return localStorage.getItem(this.TOKEN_KEY);
  }

  setUserToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearUserToken(): void{
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
