export interface Usuario {
    id?: number;
    idRol?: number;
    nombre: string;
    email: string;
    contrasenha: string;
}
export interface UsuarioSaneado {
    id: number;
    idRol: number;
    nombre: string;
    email: string;
}

export interface Login {
    email: string;
    contrasehna: string;
}