import { Component } from '@angular/core';
import { DbConnectionService, DynamicQueryRequest } from 'src/app/service/db-connection.service';
import { QueryConnectionService } from 'src/app/service/query-component.service';

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
  result: any[]  = [];
  error: string = '';

  constructor(private queryService: QueryConnectionService) { }

  executeQuery() {
    this.queryService.runQuery(this.query).subscribe({
      next: (response) => {
        this.result = response;
        this.error = '';
      },
      error: (err) => {
        this.error = err.error ? err.error : 'An error occurred';
        this.result = [];
      }
    });
  }
}
