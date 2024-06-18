import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CustomValidators } from 'ng2-validation';
import { Usuario } from '../../models/auth.interface';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {
  title: string = "Registro";
  registroForm: FormGroup;

  corregir: boolean = false
  contrasenhasDiferentes: boolean = false

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registroForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.crearRegistroForm()
  }

  crearRegistroForm(): void {
    this.registroForm = this.fb.group({
      nombre: ["", Validators.required],
      email: ["", [Validators.required, CustomValidators.email]],
      contrasenha: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      repetirContrasenha: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  };
  redirigirLogin() {
    this.router.navigate(['/login']);
  }
  submitRegistroForm() {
    const formulario = this.registroForm.value

    if (this.registroForm.valid && (formulario["contrasenha"] === formulario["repetirContrasenha"])) {
      this.corregir = false;
      this.contrasenhasDiferentes = false;
      const usuario: Usuario = {
        nombre: formulario["nombre"],
        email: formulario["email"],
        contrasenha: formulario["contrasenha"]
      }
      this.registrar(usuario)
    } else {
      this.corregir = true;
      this.contrasenhasDiferentes = true;
    }
  }

  registrar(usuario: Usuario) {
    this.authService.registro(usuario)
      .subscribe({
        next: (response) => {
          this.redirigirLogin()
        },
        error: (err) => {
          console.error('Error al crear el usuario', err);
        }
      });
  }
}
