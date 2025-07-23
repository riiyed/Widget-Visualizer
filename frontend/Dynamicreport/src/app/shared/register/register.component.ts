import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    role: 'ROLE_USER'
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const payload = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      roles: [this.user.role]
    };

    this.authService.register(payload).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed: ' + (error.error?.message || error.message || 'Unknown error'));
      }
    });
  }
}
