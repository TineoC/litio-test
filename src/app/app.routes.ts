import { Routes } from '@angular/router';

/*

Debe haber una pantalla de inicio
Deben haber aseguradoras

Hay 4 paginas:

1. Inicio
2. Guardados (Es un crud de las aseguradoras)
  2.1 Te permite agregar, actualizar y eliminar una aseguradora
  2.2 Para mostrar la lista de aseguradoras puedes usar un card con el nombre de la aseguradora, logo y una breve descripción.
3. Mi poliza
4. Ayuda

*/

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
