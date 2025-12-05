import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/services/firebase/auth';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormUtils } from '../../../FormUtils/FormUtils';
@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;

  // Signal para disparar el login
  private loginTrigger = signal<{ email: string; password: string } | null>(null);

  // rxResource para manejar el proceso de login (Angular 20+)
  loginResource = rxResource({
    params: () => this.loginTrigger(),
    stream: ({ params }) => {
      if (!params) return of(null);
      return this.authService.login(params.email, params.password);
    }
  });

  formUtils = FormUtils;
  onSubmit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.loading.set(true);
  this.errorMessage.set(null);

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe({
    next: () => {
      this.loading.set(false);
      // Cambio: Navegar a /home en lugar de /simpsons
      this.router.navigate(['/home']);
    },
    error: (error) => {
      this.loading.set(false);
      this.errorMessage.set(this.getErrorMessage(error.code));
    }
  });
  
}


  private route = inject(ActivatedRoute); // Agregar


  loading = signal(false);
  errorMessage = signal<string | null>(null);
  private returnUrl: string = '/home'; // Default

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Obtener returnUrl de los query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }
  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde.';
      default:
        return 'Error de autenticación. Intenta nuevamente.';
    } 
  } 
  // Getters para validación en el template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


    
}
