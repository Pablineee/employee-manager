import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: any[] = [];
  apiUrl: string = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    // Retrieve the authToken from localStorage
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('No authToken found. User is not authenticated.');
      return;
    }

    const headers = new HttpHeaders({
      // Add the authToken to the Authorization header
      Authorization: `Bearer ${authToken}`
    });

    const payload = {
      query: `
        query {
          employees {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `
    };

    this.http.post(this.apiUrl, payload, { headers }).subscribe({
      next: (response: any) => {
        if (response.data && response.data.employees) {
          this.employees = response.data.employees;
        } else {
          console.error('Invalid response format', response);
        }
      },
      error: (error) => {
        console.error('Error fetching employees', error.message);
      }
    });
  }
}
