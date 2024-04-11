
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.prod';
import {AreasComunesModel} from '../models/AreasComunes.model';
@Injectable({
  providedIn: 'root'
})
export class AreasComunesService {

  EXAMENUrl: string = `${environment.baseUrl}/AreasComunes`;
  constructor(private readonly http: HttpClient) {}

  getAreasComunesById(ID: number) {
    return lastValueFrom(this.http.get<AreasComunesModel>(`${this.EXAMENUrl}/${ID}`));
  }

  getAreasComunes(): Promise<AreasComunesModel[]> {
    return lastValueFrom(this.http.get<AreasComunesModel[]>(`${this.EXAMENUrl}`));
  }

  postAreasComunes(areascomunes: AreasComunesModel) {
    
    return lastValueFrom(this.http.post(`${this.EXAMENUrl}`, areascomunes));
  }
  putAreasComunes(areascomunes: AreasComunesModel, ID: number) { 
    return lastValueFrom(this.http.put(`${this.EXAMENUrl}`, areascomunes));
  }

  deleteAreasComunes(ID: any) {
    return lastValueFrom(this.http.delete(`${this.EXAMENUrl}/${ID}`));
  }
}