import { Component, effect, inject, resource, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimpsonSservice } from './services/simpson-sservice';
import { PaginationService } from './services/PaginationService';
import { PaginationComponent } from "../PaginationComponent/PaginationComponent";
import { rxResource } from '@angular/core/rxjs-interop';
import { HeroSimpsons } from "../simpsons/components/hero-simpsons/hero-simpsons";
import { Breadcrumbs } from "../../shared/components/breadcrumbs/breadcrumbs";

@Component({
  selector: 'app-simpsons-page',
  imports: [RouterLink, PaginationComponent, HeroSimpsons, Breadcrumbs, ],
  templateUrl: './simpsons-page.html',
  styleUrl: './simpsons-page.css',
})
export class SimpsonsPage {

  
  private simpsonsService = inject(SimpsonSservice);
  paginationService = inject(PaginationService);
  charactersPerPage =  signal<number>(10)
  totalPages=signal(0);
  constructor() {
    // Effect que actualiza el número de páginas cuando hay datos válidos
    effect(() => {
      if (this.simpsonsResource.hasValue()) {
        this.totalPages.set(this.simpsonsResource.value().pages);
      }
    });
  }

  /// VERSIUON CON RXRESOURCE
  simpsonsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.charactersPerPage(),
    }),
    stream: ({params}) => {
      return this.simpsonsService.getCharactersOptions({
        offset: params.page,
        limit: params.limit,
      });
    },
  });

}
