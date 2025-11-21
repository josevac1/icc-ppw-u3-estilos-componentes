import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignalBoxComponent } from '../signalBoxComponent/signalBoxComponent';

@Component({
  selector: 'app-estilos-page',
  imports: [SignalBoxComponent],
  standalone: true,
  templateUrl: './estilos-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstilosPage {

}