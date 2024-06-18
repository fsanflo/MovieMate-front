import { Routes } from '@angular/router';
import { ListaPeliculasComponent } from './views/peliculas/containers/lista-peliculas/lista-peliculas.component';
import { InputPeliculasComponent } from './views/peliculas/containers/input-peliculas/input-peliculas.component';
import { LoginComponent } from './views/auth/containers/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RegistroComponent } from './views/auth/containers/registro/registro.component';
import { AdminUsuariosComponent } from './views/auth/containers/admin-usuarios/admin-usuarios.component';
import { AdminEditarUsuarioComponent } from './views/auth/containers/admin-editar-usuario/admin-editar-usuario.component';
export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegistroComponent,
        },
        {
        path: '',
        component: InputPeliculasComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'home',
        component: InputPeliculasComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'list',
        component: ListaPeliculasComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'admin',
        component: AdminUsuariosComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'edit/:id',
        component: AdminEditarUsuarioComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        component: InputPeliculasComponent,
    },
];
