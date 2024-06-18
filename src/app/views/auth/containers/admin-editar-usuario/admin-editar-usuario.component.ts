import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../../auth.service';
import { Rol, UsuarioSaneado } from '../../models/auth.interface';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-editar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './admin-editar-usuario.component.html',
  styleUrl: './admin-editar-usuario.component.scss'
})
export class AdminEditarUsuarioComponent implements OnInit {
  title: string = "Editar usuario"
  editarUsuarioForm: FormGroup;
  idUsuario: number | null = 0
  corregir: boolean = false

  roles: Rol[] = []
  usuario: UsuarioSaneado = {} as UsuarioSaneado

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.editarUsuarioForm = new FormGroup({});
  }
  ngOnInit(): void {
    const idRol = this.authService.obtenerRol()
    this.crearEditarUsuarioForm();
    if (idRol !== 1) {
      this.redirigirInicio()
    }
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.idUsuario = idParam ? +idParam : null;
      console.log(this.idUsuario)
      this.datosUsuario(this.idUsuario)
      this.obtenerRoles();

    });
  }
  crearEditarUsuarioForm(): void {
    console.log("usuarioDATA", this.usuario.nombre)
    this.editarUsuarioForm = this.fb.group({
      nombre: [this.usuario.nombre ?? "", [Validators.required]],
      email: [this.usuario.email ?? "", [Validators.required, CustomValidators.email]],
      idRol: [this.usuario.idRol ?? "", [Validators.required]],
    });
  };

  redirigirInicio() {
    this.router.navigate(["/home"]);
  }

  redirigirAdmin() {
    this.router.navigate(['/admin']);
  }

  obtenerRoles() {
    this.authService.obtenerRoles().subscribe({
      next: (response: any) => {
        this.roles = response
        console.log(this.roles)
      },
      error: (err: any) => {
        console.error('Error al listar sesión', err);
      }
    });
  }
  datosUsuario(id: any) {
    this.authService.datosUsuario(id).subscribe({
      next: (response: any) => {
        this.usuario = response
        console.log("usr",this.usuario)
        this.crearEditarUsuarioForm();
      },
      error: (err: any) => {
        console.error('Error al listar sesión', err);
      }
    });
  }

  actualizarUsuario(){
    this.authService.actualizarActor(this.usuario.id, this.editarUsuarioForm.value).subscribe({
      next: (response: any) => {
        this.usuario = response
      },
      error: (err: any) => {
        console.error('Error al listar sesión', err);
      }
    });
  }

  submitEditarUsuarioForm() {
    if (this.editarUsuarioForm.valid) {
      this.corregir = false
      this.actualizarUsuario()
      this.redirigirAdmin()
    } else {
      this.corregir = true
    }
  }
}
