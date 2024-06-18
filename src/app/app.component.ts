import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; import { AuthService } from './views/auth/auth.service';
;



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HttpClientModule,
  ]
})
export class AppComponent {
  title = 'Encontrar películas';
  constructor(
    private authService: AuthService,
    private router: Router,

  ) {

  }
}
