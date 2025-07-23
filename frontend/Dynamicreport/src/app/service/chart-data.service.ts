import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

export interface ChartConfig {
  chartType: string;
  xAxis: string;
  yAxis: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  private chartDataSubject = new BehaviorSubject<any[]>([]);
  private chartConfigSubject = new BehaviorSubject<ChartConfig | null>(null);

  constructor(private http: HttpClient) {}

  setChartData(data: any[]): void {
    this.chartDataSubject.next(data);
  }

  getChartData(): Observable<any[]> {
    return this.chartDataSubject.asObservable();
  }

  getCurrentChartData(): any[] {
    return this.chartDataSubject.value;
  }

  setChartConfig(config: ChartConfig): void {
    this.chartConfigSubject.next(config);
  }

  getChartConfig(): ChartConfig | null {
    return this.chartConfigSubject.value;
  }

  getChartConfigObservable(): Observable<ChartConfig | null> {
    return this.chartConfigSubject.asObservable();
  }

  clearData(): void {
    this.chartDataSubject.next([]);
    this.chartConfigSubject.next(null);
  }

  hasData(): boolean {
    return this.chartDataSubject.value.length > 0;
  }

  getAvailableKeys(): string[] {
    const data = this.chartDataSubject.value;
    return data.length > 0 ? Object.keys(data[0]) : [];
  }

  saveGraphData(payload: { chartType: string; coordinates: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/jsondata/save', payload);
  }

  getSavedGraphs(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/jsondata/all');
  }
}
