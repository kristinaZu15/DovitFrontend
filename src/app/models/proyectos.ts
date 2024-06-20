import { OrganizacionDto } from "./organizacion";

export class Proyectos {
    id: number = 0;
    titulo: string = '';
    descripcion: string = '';
    montoObjetivo: number = 0;
    fechaInicio: Date = new Date();
    fechaFin: Date = new Date();
    categoria: string = '';
    organizacion: OrganizacionDto = new OrganizacionDto();
}
