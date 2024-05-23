import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzCardMetaComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'mm-input-peliculas',
  standalone: true,
  imports: [
    NzIconModule,
    NzCardComponent,
    NzCardMetaComponent,
  ],
  templateUrl: './input-peliculas.component.html',
  styleUrl: './input-peliculas.component.scss'
})


export class InputPeliculasComponent implements OnInit {
  inputPeliculasForm: FormGroup;


  title = 'Encontrar películas';
  constructor(
    private rout: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
    this.inputPeliculasForm = new FormGroup({});
  }

  ngOnInit() {
    this.createInputPeliculasForm();
  }

  createInputPeliculasForm() {
    this.inputPeliculasForm = this.fb.group({
      pelicula1: [null, Validators.required],
      pelicula2: [null, Validators.required],
    }),

      this.inputPeliculasForm.controls['pelicula1'].valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe(() => this.searchIMDB());
      this.inputPeliculasForm.controls['pelicula2'].valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe(() => this.searchIMDB());
  };

  searchIMDB() {
    console.log('searching IMDB...');
    console.log(this.inputPeliculasForm.value);
  }

  

}
