import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Import environment variables
import { env } from '../../../../src/environments/environment';

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
  registrationCode: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    // Check if password and confirmPassword are empty
    if (!this.password || !this.confirmPassword) {
      alert('Password and Confirm Password fields cannot be empty!');
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,64}$/;
    if (!passwordRegex.test(this.password)) {
      alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    // Check if password and confirmPassword match
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Check if registration code is valid
    if (this.registrationCode !== env.REGISTRATION_CODE) {
      alert('Invalid registration code!');
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
        // Ensure there are no errors returned (invalid username/email)
        if (response.errors && response.errors.length > 0) {
          console.error('Failed to add employee: ' + response.errors);
          alert('Username or email already exists!');
          return;
        }

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

  // TODO: Implement a function to handle user password reset
  resetPassword(): void {
    this.router.navigate(['/reset-password']);
  }
}