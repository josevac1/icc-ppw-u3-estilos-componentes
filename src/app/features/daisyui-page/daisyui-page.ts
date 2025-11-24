import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarDrawer } from "./componentes/Navbar-drawer/Navbar-drawer";
import { Codigo } from "./componentes/codigo/codigo";
import { Tabla } from "./componentes/Tabla/Tabla";
import { Card } from "./componentes/Card/Card";
import { CardResponsable } from "./componentes/Card-Responsable/Card-Responsable";
import { FooterModerno } from "./componentes/FooterModerno/FooterModerno";
import { Carousel } from './componentes/carousel/carousel';
import { Alert } from './componentes/alert/alert';

@Component({
  selector: 'app-daisyui-page',
  standalone: true,
  imports: [CommonModule, NavbarDrawer, Codigo, Tabla, Card, CardResponsable, FooterModerno, Alert, Carousel],
  templateUrl: './daisyui-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaisyuiPage { }
