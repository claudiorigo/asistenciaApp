import { Registro } from '../models/registro.model';
export interface Usuarios{
  id: number;
  nombre: string;
  avatar: string;
  email: string;
  telefono: string;
  password: string;
  horario: string;
  sede: string;
  seccion: string;
  registro: Registro [];
}

export interface Docentes{
  id: number;
  profesor: string;
  avatar: string;
  asignatura: string;
  seccion: string;
  correo: string;
  asiste: boolean; 
}



