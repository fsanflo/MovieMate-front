import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Actor, Genero, Pelicula } from '../../../views/peliculas/models/peliculas.interface';

@Component({
  selector: 'app-modal-datos-pelicula',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-datos-pelicula.component.html',
  styleUrl: './modal-datos-pelicula.component.scss'
})
export class ModalDatosPeliculaComponent {
  pelicula: Pelicula = this.data.pelicula;
  actores: Actor[] = this.data.actores;
  generos: Genero[] = this.data.generos;

  no_img: string = "../../../../assets/images/no-img.png"

  constructor(
    public matDialogRef: MatDialogRef<ModalDatosPeliculaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
