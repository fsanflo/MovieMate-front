import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UsuarioSaneado } from '../../models/auth.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from "ng-zorro-antd/table";

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
  ],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.scss'
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: UsuarioSaneado[] = []

  listOfCurrentPageData: any[] = []
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idRol = this.authService.obtenerRol()
    if (idRol !== 1) {
      this.redirigirInicio()
    }
    this.listaUsuarios()
  }

  redirigirInicio() {
    this.router.navigate(["/home"]);
  }

  listaUsuarios() {
    this.authService.listaUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response
      },
      error: (err) => {
        console.error('Error al listar sesión', err);
      }
    });
  }

  editar(usuario: any) {
    this.router.navigate([`/edit/${usuario.id}`]);
  }

}
