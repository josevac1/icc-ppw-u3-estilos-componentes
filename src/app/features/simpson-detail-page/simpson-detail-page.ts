import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { SimpsonSservice } from '../simpsons-page/services/simpson-sservice';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-simpson-detail-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './simpson-detail-page.html',
  styleUrl: './simpson-detail-page.css',
})
export class SimpsonDetailPage {
   private route = inject(ActivatedRoute);
  private service = inject(SimpsonSservice);

  personaje = toSignal(
    this.route.paramMap.pipe(
      map(params => +params.get('id')!),
      switchMap(id => this.service.getCharacterById(id))
    ),
    { initialValue: null }
  );

}
