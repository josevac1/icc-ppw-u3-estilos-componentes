import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SimpsonSservice } from './services/simpson-sservice';
import { PaginationService } from './services/PaginationService';

@Component({
  selector: 'app-simpsons-page',
  imports: [],
  templateUrl: './simpsons-page.html',
  styleUrl: './simpsons-page.css',
})
export class SimpsonsPage {
    private SimpsonSservice = inject(SimpsonSservice);
  PaginationService = inject(PaginationService);

  simpsonsResource = toSignal(
    this.SimpsonSservice.getCharacters(this.PaginationService.currentPage()).pipe(
      map(res => res)
    ),
    { initialValue: null }
  );

}
