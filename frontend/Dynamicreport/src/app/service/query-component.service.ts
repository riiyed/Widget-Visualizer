import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DynamicQueryRequest {

  query: string;
}

@Injectable({
  providedIn: 'root'
})
export class QueryConnectionService {
  runGraph(query: string) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:8080/api/dynamic-query/execute-query'; 

  constructor(private http: HttpClient) { }

  runQuery(query: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, query);
  }
}
