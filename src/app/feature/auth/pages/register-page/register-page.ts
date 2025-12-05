import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/firebase/auth';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { FormUtils } from '../../../FormUtils/FormUtils';
import { CommonModule } from '@angular/common';
import { UserProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {


  error = signal<string | null>(null);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  private firestore = inject(Firestore);

  // Signal para disparar el registro
  private registerTrigger = signal<{ email: string; password: string } | null>(null);
  
  // rxResource para manejar el proceso de registro (Angular 20+)
  registerResource = rxResource({
    params: () => this.registerTrigger(),
    stream: ({ params }) => {
      if (!params) return of(null);
      return this.authService.register(params.email, params.password);
    }
  });

  formUtils = FormUtils;

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });

    // Effect para navegar cuando el registro sea exitoso
    effect(() => {
      if (this.registerResource.hasValue() && this.registerResource.value()) {
        console.log('Registro exitoso, navegando a /simpsons');
        this.router.navigate(['/simpsons']);
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

 // En register-page.ts
 
onSubmit() {
  const { email, password } = this.registerForm.value;

  this.authService.register(email, password).subscribe({
    next: async (userCredential) => {
      // Crear documento de perfil en Firestore
      const userProfile: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        role: 'user', // Rol por defecto
        displayName: userCredential.user.displayName || ''
      };

      await setDoc(
        doc(this.firestore, 'users', userCredential.user.uid),
        userProfile
      );

      this.router.navigate(['/home']);
    },
    error: (error) => {
      this.error.set(this.getErrorMessage(error.code));
    }
  });
}
  getErrorMessage(code: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña es muy débil'
    };
    return errorMessages[code] || 'Error al registrar usuario';
  }



  // Computed signal para el estado de carga
  loading = this.registerResource.isLoading;

  // Computed signal para el mensaje de error
  errorMessage = () => {
    const error = this.registerResource.error();
    if (!error) return '';

    const code = (error as any).code || '';
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña es muy débil'
    };
    return errorMessages[code] || 'Error al registrar usuario';
  }

  
get email() {
  return this.registerForm.get('email');
}

get password() {
  return this.registerForm.get('password');
}

get confirmPassword() {
  return this.registerForm.get('confirmPassword');
}
}
