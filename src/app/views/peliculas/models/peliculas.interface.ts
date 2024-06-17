export interface Pelicula {
    id: number;
    titulo: string;
    genero: string;
    trama: string;
    director: string;
    valoraciones: number;
    duracion: number;
    anho: number;
    portada?: string;
    idGeneros?: number[];
}

export interface Actor {
    id: number;
    nombre: string;
    imagen?: string;
    personaje?: string;
}

export interface Genero {
    id: number;
    nombre: string;
}