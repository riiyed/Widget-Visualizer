import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}
onSubmit() {
  if (this.loginData.email && this.loginData.password) {
    this.authService.login(this.loginData).subscribe({
      next: () => {
        const token = localStorage.getItem('token');
        console.log('Stored token:', token);
        if (token) {
          alert('Login successful');
          this.router.navigate(['/dbconnection']);
        } else {
          alert('Login failed: Token missing');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed: ' + (err.error?.message || err.message));
      }
    });
  }
}
}
