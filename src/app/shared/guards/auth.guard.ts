import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../views/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Obtener el rol del usuario
      const userRole = this.authService.obtenerRol();
      
      console.log("userRole",userRole)

      if (userRole == 1 || userRole == 2) {
        return true;
      } else {
        this.router.navigate(['/login']); // Redirigir a una página de no autorizado
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}