import { inject, Injectable, signal } from '@angular/core';
import { from } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut, UserProfile } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  
  // Signal para el usuario actual
  currentUser = signal<User | null>(null);
  
  // Observable del estado de autenticación
  user$ = user(this.auth);

  

  /**
   * Registrar nuevo usuario con email y password
   */
  register(email: string, password: string): Observable<any> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  /**
   * Login con email y password
   */
  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  /**
   * Login con Google
   */
//   loginWithGoogle(): Observable<any> {
//     const provider = new GoogleAuthProvider();
//     const promise = signInWithPopup(this.auth, provider);
//     return from(promise);
//   }

  /**
   * Cerrar sesión
   */
  logout(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

  /**
   * Verificar si hay un usuario autenticado
   */
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

 
  private firestore: Firestore = inject(Firestore);
  
  
  userProfile = signal<UserProfile | null>(null);

  constructor() {
    this.user$.subscribe(async user => {
      this.currentUser.set(user);
      
      if (user) {
        // Cargar perfil del usuario desde Firestore
        const profileDoc = await getDoc(
          doc(this.firestore, 'users', user.uid)
        );
        
        if (profileDoc.exists()) {
          this.userProfile.set(profileDoc.data() as UserProfile);
        }
      } else {
        this.userProfile.set(null);
      }
    });
  }

  hasRole(role: string): boolean {
    const profile = this.userProfile();
    return profile?.['role'] === role;
  }
}

