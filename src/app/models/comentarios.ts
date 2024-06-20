import { Proyectos } from "./proyectos";
import { Donante } from "./donante";

export class Comentarios {
    id: number = 0
    titulo: string = ""
    description:string=""  
    proyectoId: Proyectos = new Proyectos()
    donanteId: Donante = new Donante()
}