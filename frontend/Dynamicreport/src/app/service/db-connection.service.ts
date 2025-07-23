import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DynamicQueryRequest {
  url: string;
  username: string;
  password: string;
  query: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbConnectionService {

  private apiUrl = 'http://localhost:8080/api/dynamic-query/connect'; 

  constructor(private http: HttpClient) { }

  runQuery(request: DynamicQueryRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }
}
