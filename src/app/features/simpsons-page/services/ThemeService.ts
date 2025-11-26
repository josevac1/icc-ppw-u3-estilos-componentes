import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private readonly THEME_KEY = 'app-theme';
  private readonly DEFAULT_THEME = 'light';

  constructor() {}

  // Guardar en localStorage
  saveTheme(theme: string): void {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      console.warn('No se pudo guardar el tema en localStorage', error);
    }
  }

  // Obtener de localStorage
  getTheme(): string {
    try {
      return localStorage.getItem(this.THEME_KEY) || this.DEFAULT_THEME;
    } catch (error) {
      console.warn('No se pudo leer el tema en localStorage', error);
      return this.DEFAULT_THEME;
    }
  }

  // Aplicar el tema al HTML
  applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Inicializar (usado al cargar la app)
  initTheme(): void {
    const savedTheme = this.getTheme();
    this.applyTheme(savedTheme);
  }
}
