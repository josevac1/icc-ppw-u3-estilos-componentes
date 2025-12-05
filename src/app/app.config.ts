import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


const firebaseConfig = {
  apiKey: "AIzaSyBuoIkDajH2ZgvN_zIybOzRA0y6Cwq4UuU",
  authDomain: "angular-icc-ppw-11-firebase.firebaseapp.com",
  projectId: "angular-icc-ppw-11-firebase",
  storageBucket: "angular-icc-ppw-11-firebase.firebasestorage.app",
  messagingSenderId: "297778213766",
  appId: "1:297778213766:web:890681da8b4accef337207",
  measurementId: "G-R0SQXWJV4W"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // habilita HttpClient usando la API Fetch
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  
};

