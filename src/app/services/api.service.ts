import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://localhost:7294/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // GET: Obtener datos
  get(endpointKey: keyof typeof API_ENDPOINTS, params?: any): Observable<any> {
    const url = `${this.apiUrl}/${API_ENDPOINTS[endpointKey]}`;
    let httpParams = new HttpParams({ fromObject: params });
    return this.http.get(url, {
      headers: this.getHeaders(),
      params: httpParams,
    });
  }

  // POST: Crear un nuevo recurso
  post(endpointKey: keyof typeof API_ENDPOINTS, data: any): Observable<any> {
    const url = `${this.apiUrl}/${API_ENDPOINTS[endpointKey]}`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  // PUT: Actualizar un recurso existente
  put(endpointKey: keyof typeof API_ENDPOINTS, data: any): Observable<any> {
    const url = `${this.apiUrl}/${API_ENDPOINTS[endpointKey]}`;
    return this.http.put(url, data, { headers: this.getHeaders() });
  }

  // DELETE: Eliminar un recurso
  delete(endpointKey: keyof typeof API_ENDPOINTS): Observable<any> {
    const url = `${this.apiUrl}/${API_ENDPOINTS[endpointKey]}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
