import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tabla } from "./componentes/Tabla/Tabla";
import { Card } from "./componentes/Card/Card";
import { CardResponsable } from "./componentes/Card-Responsable/Card-Responsable";
import { Carousel } from "./componentes/carousel/carousel";
import { Alert } from "./componentes/alert/alert";
import { Codigo } from "./componentes/codigo/codigo";

@Component({
  selector: 'app-daisyui-page',
  standalone: true,
  imports: [Tabla, Card, CardResponsable, Carousel, Alert, Codigo],
  templateUrl: './daisyui-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaisyuiPage { }
