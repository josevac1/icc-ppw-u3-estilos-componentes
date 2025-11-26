import { Routes } from '@angular/router';
import { DaisyuiPage } from './features/daisyui-page/daisyui-page';
import { SimpsonsPage } from './features/simpsons-page/simpsons-page';
import { SimpsonDetailPage } from './features/simpson-detail-page/simpson-detail-page';
import { EstilosPage } from './features/estilos-page/estilos-page';

export const routes: Routes = [

  {
    path: '',
    component: DaisyuiPage
  },
  {
    path: 'simpsons',
    component: SimpsonsPage,
  },
  {
    path: 'simpsons/:id',
    component: SimpsonDetailPage,
  },
    {
    path: 'estilos',
    component: EstilosPage,
  }


];
