import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ThemeService } from '../../../features/simpsons-page/services/ThemeService';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
})
export class ThemeSwitcher {
    // Temas disponibles
  themes = ['light', 'dark', 'dim'];

 
  // Signal que contiene el tema actual
  currentTheme = signal<string>('light');

  constructor(private themeService: ThemeService) {
    // Cargar el tema guardado al iniciar el componente
    const savedTheme = this.themeService.getTheme();
    this.currentTheme.set(savedTheme);
    this.themeService.applyTheme(savedTheme);
  }

  // Cambiar el tema
  setTheme(theme: string): void {
    this.themeService.applyTheme(theme);  // aplica el tema al <html>
    this.themeService.saveTheme(theme);   // guarda el tema en localStorage
    this.currentTheme.set(theme);         // actualiza reactivo
  }
}
