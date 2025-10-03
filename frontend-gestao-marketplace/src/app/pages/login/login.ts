import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { UserAuthService } from '../../services/user-auth';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginErrorMessage = '';

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  private readonly _userService = inject(UserService);
  private readonly _userAuthService = inject(UserAuthService);
  private readonly _router = inject(Router);

  login() {
    if(this.userForm.invalid) return;

    this._userService.login(this.userForm.get('email')?.value as string,
    this.userForm.get('password')?.value as string).pipe(take(1)).subscribe({
      next: (response) => {
        //salvar o token no localstorage
        this._userAuthService.setUserToken(response.data.token);

        //redireciona para a tela de produtos
        this._router.navigate(['/products']);
      },
      error: (error) => {
        console.log(error);

        this.loginErrorMessage = error.error.message;

      },
    })
  }

}
