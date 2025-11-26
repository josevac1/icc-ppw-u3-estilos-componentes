import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterModerno } from "./features/daisyui-page/componentes/FooterModerno/FooterModerno";
import { NavbarDrawer } from "./features/daisyui-page/componentes/Navbar-drawer/Navbar-drawer";
import { BackToTop } from "./shared/components/back-to-top/back-to-top";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterModerno, NavbarDrawer, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('03-ui-componentes-estilos');
}
