import { Routes } from '@angular/router';
import { ListaPeliculasComponent } from './views/peliculas/containers/lista-peliculas/lista-peliculas.component';
import { InputPeliculasComponent } from './views/peliculas/containers/input-peliculas/input-peliculas.component';

export const routes: Routes = [
    {
        path: '',
        component: InputPeliculasComponent,
    },
    {
        path: 'home',
        component: InputPeliculasComponent,
    },
    {
        path: 'list',
        component: ListaPeliculasComponent,
    },
];
