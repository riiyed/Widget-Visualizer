import { Component } from '@angular/core';
import { QueryConnectionService } from 'src/app/service/query-component.service';
import { ChartDataService } from 'src/app/service/chart-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent {
  url: string = '';
  username: string = '';
  password: string = '';
  query: string = '';
  result: any[] = [];
  error: string = '';
  columnKeys: string[] = [];

  constructor(
    private queryService: QueryConnectionService,
    private chartDataService: ChartDataService,
    private router: Router
  ) {}

  executeQuery() {
    if (!this.query.trim()) {
      alert(" You didn't write a query?! ");
      return;
    }

    this.queryService.runQuery(this.query).subscribe({
      next: (response) => {
        this.result = response;
        this.error = '';
        if (this.result.length > 0) {
          this.columnKeys = Object.keys(this.result[0]);
          this.chartDataService.setChartData(this.result);
        }
      },
      error: (err) => {
        this.error = err.error ? err.error : 'An error occurred';
        this.result = [];
        this.columnKeys = [];
        alert("  Try again!");
      }
    });
  }

  goToGraphPage() {
    if (!this.result.length) {
      alert("  First execute a query ");
      return;
    }
    this.chartDataService.setChartData(this.result);
    this.router.navigate(['/charts']);
  }
}
