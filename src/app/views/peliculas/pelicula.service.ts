import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Helpers } from '../../shared/helpers/helpers';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Actor, Genero, Pelicula } from './models/peliculas.interface';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private peliculasPorGeneros = new BehaviorSubject<any[]>([]);
  peliculas$: Observable<Pelicula[]> = this.peliculasPorGeneros.asObservable();
  apiUrl = `http://localhost:3001/api`;
  constructor(
    private http: HttpClient
  ) { }

  buscarPeliculas(titulo: string): Observable<Pelicula> {
    const url = `${this.apiUrl}/peliculas/buscar/${titulo}`;
    return this.http.get<Pelicula>(url).pipe(catchError(Helpers.handleError));
  }

  datosPelicula(id: number): Observable<Pelicula> {
    const url = `${this.apiUrl}/peliculas/datos/${id}`;
    return this.http.get<Pelicula>(url).pipe(catchError(Helpers.handleError));
  }

  peliculasPorGenero(idPeliculas: any) {
    const url = `${this.apiUrl}/peliculas/list`;
    this.http.post<any>(url, idPeliculas).pipe(catchError(Helpers.handleError)).subscribe(response => {
      const peliculas = response.listaPeliculas;
      this.peliculasPorGeneros.next(peliculas);

    });
  }

  actoresPelicula(id: number): Observable<Actor[]> {
    const url = `${this.apiUrl}/peliculas/reparto/${id}`;
    return this.http.get<Actor[]>(url).pipe(catchError(Helpers.handleError));
  }

  generosPelicula(id: number): Observable<Genero[]> {
    const url = `${this.apiUrl}/peliculas/generos/${id}`;
    return this.http.get<Genero[]>(url).pipe(catchError(Helpers.handleError));
  }
}
