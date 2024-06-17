import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../pelicula.service';
import { Router, RouterOutlet } from '@angular/router';
import { Actor, Genero, Pelicula } from '../../models/peliculas.interface';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalDatosPeliculaComponent } from '../../../../shared/modal/modal-datos-pelicula/modal-datos-pelicula.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mm-lista-peliculas',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzModalModule,

  ],
  templateUrl: './lista-peliculas.component.html',
  styleUrl: './lista-peliculas.component.scss'
})
export class ListaPeliculasComponent implements OnInit {
  title = 'Lista de películas';

  peliculas: Pelicula[] = [];
  
  peliculaSeleccionada: Pelicula = {} as Pelicula
  actores: Actor[] = [];
  generos: Genero[] = [];

  no_img: string = '../../../../../assets/images/no-img.png';

  dataRecibida: boolean = false;
  mostrarModal: boolean = false
  constructor(
    private peliculaService: PeliculaService,
    private router: Router,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    const peliculasGuardadas = localStorage.getItem('peliculas');
    if (peliculasGuardadas) {
      this.peliculas = JSON.parse(peliculasGuardadas);
    }

    this.peliculaService.peliculas$.subscribe(data => {
      if (data.length !== 0) {
        this.peliculas = data;
        localStorage.setItem('peliculas', JSON.stringify(this.peliculas));
      } else if (this.peliculas.length === 0) {
        this.redirigirInicio()
      }
    });
    setTimeout(() => {
      if (!this.dataRecibida && this.peliculas.length === 0) {
        this.redirigirInicio()
      }
    }, 500);
  }

  redirigirInicio() {
    this.router.navigateByUrl('/home');
  }


  seleccionarPelicula(pelicula: Pelicula) {
    this.peliculaSeleccionada = pelicula
    this.mostrarModal = true
    this.datosPelicula(pelicula.id)
  }

  datosPelicula(id: number) {
    this.peliculaService.actoresPelicula(id).subscribe((response: Actor[]) => {
      if (response) {
        this.actores = response;
      };
    });

    this.peliculaService.generosPelicula(id).subscribe((response: Genero[]) => {
      if (response) {
        this.generos = response;
      this.mostrarDatos()
      };
    });


  }
  mostrarDatos() {
    console.log(this.peliculaSeleccionada)
    this.matDialog.open(ModalDatosPeliculaComponent, {
      maxHeight: "50vw",
      data: {
        pelicula: this.peliculaSeleccionada,
        actores: this.actores,
        generos: this.generos,
      },
    })
  }

}
