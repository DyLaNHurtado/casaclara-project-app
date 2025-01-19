export interface Anuncio {
    id?: number;
    nombre: string;
    telefono: string;
    tipo: 'particular' | 'inmobiliaria';
    categoria: string;
    precio: number;
    ubicacion: string;
    coordenadas: { lat: number; lng: number };
    fotos: string[];
    descripcion: string;
    fecha?: Date;
  }