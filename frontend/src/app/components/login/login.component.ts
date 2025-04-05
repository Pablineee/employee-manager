import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const apiUrl = `http://localhost:4000/graphql`;

    const query = `
      query Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          username
        }
      }
    `;

    const variables = {
      username: this.username,
      password: this.password
    };

    const payload = {
      query,
      variables
    };

    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        if (response.data && response.data.login) {
          localStorage.setItem('authToken', response.data.login.token);
          this.router.navigate(['/employees']);
        } else {
          alert('Login failed. Please check your credentials.');
        }
      },
      error: (error) => {
        console.error('Login failed', error.message);
        alert('Invalid username or password');
      }
    });
  }
}