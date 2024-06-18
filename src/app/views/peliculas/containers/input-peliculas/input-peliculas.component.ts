import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzCardMetaComponent } from 'ng-zorro-antd/card';
import { PeliculaService } from '../../pelicula.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Pelicula } from '../../models/peliculas.interface';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'mm-input-peliculas',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    MatLabel,
    MatInputModule,
    MatFormFieldModule,
    NzCardComponent,
    NzCardMetaComponent,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './input-peliculas.component.html',
  styleUrl: './input-peliculas.component.scss'
})


export class InputPeliculasComponent implements OnInit {
  title = 'Encontrar películas';
  inputPeliculasForm: FormGroup;
  peliculas: Pelicula[] = [];

  pelicula1: Pelicula = {} as Pelicula;
  pelicula2: Pelicula = {} as Pelicula;

  cargando: boolean = false;
  corregir: boolean = false;
  placeholder: string = '../../../../../assets/images/placeholder.png';

  constructor(
    private peliculaService: PeliculaService,
    private fb: FormBuilder,
    private router: Router,
    // private _snackBar: MatSnackBar,
  ) {
    this.inputPeliculasForm = new FormGroup({});
  }

  ngOnInit() {
    this.crearInputPeliculasForm();
    // this.showSnackbar();
  }
  //TODO Hacer que funcione desde aqui
  // showSnackbar() {
  //   this._snackBar.openFromComponent(SnackbarComponent, {

  //     data: { message: 'Your custom message' },
  //     duration: 3000,
  //   });
  // }


  crearInputPeliculasForm() {
    this.inputPeliculasForm = this.fb.group({
      pelicula1: ['', Validators.required],
      pelicula2: ['', Validators.required],
    });
  };

  peliculaSeleccionada(pelicula: any, input: string) {
    const inputPelicula = document.querySelector(`input[formControlName="${input}"]`) as HTMLInputElement;
    if (inputPelicula) {
      inputPelicula.value = pelicula.titulo;
      this.peliculas = [];
    }

    const portada = pelicula.portada;
    if (portada) {
      const img = document.querySelector(`img[alt="${input}"]`) as HTMLImageElement;
      if (img) {
        img.src = portada ? portada : this.placeholder;
      }
    }
    this.datosPeliculas(pelicula.id, input);
  }

  buscarPeliculas(input: any) {
    //TODO Hacer que el listado de opciones se vacíe al cambiar de input
    this.cargando = true;
    const tituloBusqueda = input.value.trim();
    if (!tituloBusqueda) return;
    this.peliculaService.buscarPeliculas(tituloBusqueda)
      .subscribe((response: any) => {
        if (response) {
          this.peliculas = response;
          this.cargando = false;

        }
      });
  }

  datosPeliculas(id: number, input: string): Pelicula | void {
    this.peliculaService.datosPelicula(id)
      .subscribe((response: any) => {
        if (response) {
          console.log("response", response)
          this.inputPeliculasForm.value[input] = response;
          switch (input) {
            case 'pelicula1':
              this.pelicula1 = response;
              break;
            case 'pelicula2':
              this.pelicula2 = response;
              break;
          };

          return response
        }
      });
  }



  submitPeliculas() {

    if (this.pelicula1.id && this.pelicula2.id) {

      const idPeliculas = {
        pelicula1: this.pelicula1.id,
        pelicula2: this.pelicula2.id,
      };

      this.peliculaService.peliculasPorGenero(idPeliculas);
      this.router.navigateByUrl(`/list`);

    } else {
      //TODO SNACKBAR ERROR
      console.error("Error")
    }
  }
}

