import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Comentarios } from '../models/comentarios';
import { environment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor() { }
}
