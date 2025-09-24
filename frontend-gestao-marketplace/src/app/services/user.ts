import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';
import { Observable } from 'rxjs';
import { ILoginSuccessResponse } from '../interfaces/login-success-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);

  validateUser(): Observable<IAuthSuccessResponse> {
    return this._httpClient.get<IAuthSuccessResponse>(environment.apiUrl + '/protected');
  }

  login(email: string, password: string): Observable<ILoginSuccessResponse> {
    const body = { email, password };

    return this._httpClient.post<ILoginSuccessResponse>(environment.apiUrl + '/users/login', body);
  }
}
