import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './Card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card { }
