import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _httpClient = inject(HttpClient);

  validateUser(): Observable<IAuthSuccessResponse> {
    return this._httpClient.get<IAuthSuccessResponse>('http://localhost:3000/api/protected');
  }
}
