import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importa HttpClient si necesitas hacer peticiones HTTP
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CustomValidators } from 'ng2-validation';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mm-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title: string = "Iniciar sesión";

  loginForm: FormGroup;

  corregir: boolean = false

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({});
  }

  ngOnInit() {
    this.crearLoginForm()
  }

  crearLoginForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, CustomValidators.email]],
      contrasenha: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  };

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.corregir = false
      this.login();
    } else {
      this.corregir = true
    }
  }
  login(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        switch (this.authService.obtenerRol()) {
          case 1: //Admin
            this.router.navigate(['/admin']);
            break;
          case 2: //Usuario
            this.router.navigate(['/home']);
            break;
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
      }
    });

  }

  registrar() {
    this.router.navigate(['/register']);
  }
}