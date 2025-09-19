import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginErrorMessage = '';
  
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);
  private readonly _userAuthService = inject(UserAuthService);

  login() {
    if(!this.userForm.valid) return;
    
    this._userService.login(this.userForm.value.email as string, this.userForm.value.password as string)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log('Sucesso login: ', response);
          this.loginErrorMessage = '';

          this._userAuthService.setUserToken(response.data.token);

          this._router.navigate(['/products']);
        },
        error: (error) => {
          console.log('Erro login: ', error);
          this.loginErrorMessage = error.error.message;
        }
      });
  }
}
