import { Injectable } from "@angular/core";
import { Publicaciones_Foro } from "../model/Publicaciones_Foro";
import { HttpClient } from "@angular/common/http";

const base_url = "http://localhost:8084";

@Injectable({
  providedIn: "root",
})
export class PubliacionForoService {
  constructor(private http: HttpClient) {}

  getPublicaciones_Foros() {
    const endpoint = `${base_url}`;
    return this.http.get<Publicaciones_Foro[]>(endpoint);
  }
  getPublicaciones_ForosById(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.get<Publicaciones_Foro[]>(endpoint);
  }
  savePublicaciones_Foro(body: any) {
    const endpoint = `${base_url}`;
    return this.http.post<Publicaciones_Foro>(endpoint, body);
  }
  updatePublicaciones_Foro(body: any, id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.put<Publicaciones_Foro>(endpoint, body);
  }
}
