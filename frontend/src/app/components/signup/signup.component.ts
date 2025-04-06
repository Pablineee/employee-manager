import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    // Check if password and confirmPassword are empty
    if (!this.password || !this.confirmPassword) {
      alert('Password and Confirm Password fields cannot be empty!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const apiUrl = `http://localhost:4000/graphql`;

    const mutation = `
      mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
          token
          username
          email
        }
      }
    `;

    const variables = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    const payload = {
      query: mutation,
      variables
    };

    if (!this.username || !this.email) {
      alert('Username and Email fields cannot be empty!');
      return;
    }
    
    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        if (response.data) {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        } else {
          alert('Registration failed: Invalid response from server.');
        }
      },
      error: (error) => {
        console.error('Registration failed', error.message);
        alert('An error occurred during registration.');
      }
    });
  }
}