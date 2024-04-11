
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.prod';
import {UsuariosModel} from '../models/Usuarios.model';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  EXAMENUrl: string = `${environment.baseUrl}/Usuarios`;
  constructor(private readonly http: HttpClient) {}

  getUsuariosById(Email: number) {
    return lastValueFrom(this.http.get<UsuariosModel>(`${this.EXAMENUrl}/${Email}`));
  }

  getUsuarios(): Promise<UsuariosModel[]> {
    return lastValueFrom(this.http.get<UsuariosModel[]>(`${this.EXAMENUrl}`));
  }

  postUsuarios(usuarios: UsuariosModel) {
    
    return lastValueFrom(this.http.post(`${this.EXAMENUrl}`, usuarios));
  }
  putUsuarios(usuarios: UsuariosModel, Email: number) { 
    return lastValueFrom(this.http.put(`${this.EXAMENUrl}`, usuarios));
  }

  deleteUsuarios(Email: any) {
    return lastValueFrom(this.http.delete(`${this.EXAMENUrl}/${Email}`));
  }
}