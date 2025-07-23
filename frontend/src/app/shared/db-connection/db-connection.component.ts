import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbConnectionService, DynamicQueryRequest } from 'src/app/service/db-connection.service';

@Component({
  selector: 'app-db-connection',
  templateUrl: './db-connection.component.html',
  styleUrls: ['./db-connection.component.css']
})
export class DbConnectionComponent {
  url: string = '';
  username: string = '';
  password: string = '';
  query: string = ''; 
  result: any;
  error: any;

  constructor(private dbService: DbConnectionService, private router: Router) {}

  executeQuery(): void {
    const request: DynamicQueryRequest = {
      url: this.url,
      username: this.username,
      password: this.password,
      query: this.query
    };

    this.dbService.runQuery(request).subscribe({
      next: (res) => {
        this.result = res;
        this.error = null;
        this.router.navigate(["query"]);
      },
      error: (err) => {
        this.error = err.message || 'Error executing query';
        this.result = null;
      }
    });



  }
}
