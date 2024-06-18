import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helpers } from '../../shared/helpers/helpers';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Login, Usuario, UsuarioSaneado } from './models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:3001/api`;
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  private readonly SALT = "MovieMateFsanflo"
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  login(credenciales: Login): Observable<any> {
    const url = `${this.apiUrl}/auth/login`
    return this.http.post<any>(url, credenciales)
      .pipe(tap(response => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true);
        }
      })
      );
  }

  registro(usuario: Usuario) {
    const url = `${this.apiUrl}/auth/register`
    return this.http.post(url, usuario).pipe(catchError(Helpers.handleError));
  }

  listaUsuarios(): Observable<UsuarioSaneado[]>{
    const url = `${this.apiUrl}/auth`
    return this.http.get<UsuarioSaneado[]>(url).pipe(catchError(Helpers.handleError));
  }


  getToken(): string | null {
    return localStorage.getItem("token");
  }

  setToken(token: string): void {
    localStorage.setItem(this.SALT, token);
  }

  eliminarToken(): void {
    localStorage.removeItem(this.SALT);
  }

  obtenerRol(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.rol;
      } catch (error) {
        console.error('Error parsing JWT token payload:', error);
        return null;
      }
    }
    return null;
  }
}
