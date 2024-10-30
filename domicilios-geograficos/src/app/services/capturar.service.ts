import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entidad } from '../model/entidad';
import { Municipio } from 'src/app/model/municipio';
import { Localidad } from '../model/localidad';
import { Vialidad } from '../model/vialidad';
import { Asentamiento } from '../model/asentamiento';
import { DomicilioGeografico } from '../model/domiciliogeografico';

@Injectable({
  providedIn: 'root'
})
export class CapturarService {

  constructor(private http: HttpClient) { }

  getEntidades() {
    return this.http.get<Entidad[]>(environment.baseUrl + ':' + environment.puerto + environment.entidades);
  }

  getMunicipios(cve_ent: string) {
    return this.http.get<Municipio[]>(environment.baseUrl + ':' + environment.puerto + environment.municipios + '/' + cve_ent);
  }

  getLocalidades(cve_ent: string, cve_mun: string) {
    return this.http.get<Localidad[]>(environment.baseUrl + ':' + environment.puerto + environment.localidades + '/' + cve_ent + '/' + cve_mun);
  }

  getTiposVialidades(cve_ent: string, cve_mun: string, cve_loc: string, buscar_nombre_vialidad: string) {
    return this.http.get<Vialidad[]>(environment.baseUrl + ':' + environment.puerto + environment.tiposVialidades + '/' + cve_ent + '/' + cve_mun + '/' + cve_loc + '/' + buscar_nombre_vialidad);
  }

  getNombresVialidades(cve_ent: string, cve_mun: string, cve_loc: string, cve_tipo_vialidad: string, buscar_nombre_vialidad: string) {
    return this.http.get<Vialidad[]>(environment.baseUrl + ':' + environment.puerto + environment.nombresVialidades + '/' + cve_ent + '/' + cve_mun + '/' + cve_loc + '/' + cve_tipo_vialidad + '/' + buscar_nombre_vialidad);
  }

  getTiposAsentamientos(cve_ent: string, cve_mun: string, cve_loc: string, buscar_nombre_asentamiento: string) {
    return this.http.get<Asentamiento[]>(environment.baseUrl + ':' + environment.puerto + environment.tiposAsentamientos + '/' + cve_ent + '/' + cve_mun + '/' + cve_loc + '/' + buscar_nombre_asentamiento);
  }

  getNombresAsentamientos(cve_ent: string, cve_mun: string, cve_loc: string, cve_tipo_asentamiento: string, buscar_nombre_asentamiento: string) {
    return this.http.get<Vialidad[]>(environment.baseUrl + ':' + environment.puerto + environment.nombresAsentamientos + '/' + cve_ent + '/' + cve_mun + '/' + cve_loc + '/' + cve_tipo_asentamiento + '/' + buscar_nombre_asentamiento);
  }

  insertDomicilioGeografico(domicilioGeografico: DomicilioGeografico) {
    return this.http.post(environment.baseUrl + ':' + environment.puerto + environment.domicilioGeografico, domicilioGeografico);
  }

  getDomicilioGeografico() {
    return this.http.get<DomicilioGeografico[]>(environment.baseUrl + ':' + environment.puerto + environment.domicilioGeografico);
  }

  deleteDomicilioGeografico(id: string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puerto + environment.domicilioGeografico + '/' + id);
  }

}
