import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { InputPeliculasComponent } from './input-peliculas/input-peliculas.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        InputPeliculasComponent
    ]
})
export class AppComponent { 
  title = 'Encontrar películas';
  constructor(
    private router: Router,

  ) { }
}
