import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DbConnectionService, DynamicQueryRequest } from 'src/app/service/db-connection.service';

@Component({
  selector: 'app-db-connection',
  templateUrl: './db-connection.component.html',
  styleUrls: ['./db-connection.component.css']
})
export class DbConnectionComponent implements OnInit {
  url = '';
  username = '';
  password = '';
  query = '';
  result: any;
  error: any;

  constructor(
    private authService: AuthService,
    private dbService: DbConnectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (!token) {
     
    }
  }

  executeQuery(): void {
    if (!this.url || !this.username || !this.password) {
      alert('Fill in the details.');
      return;
    }

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
        this.router.navigate(['/query']);
      },
      error: (err) => {
        this.error = err.message || 'Error executing query';
        this.result = null;
      }
    });
  }
}
