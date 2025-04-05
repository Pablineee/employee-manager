import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: any[] = [];
  employee: any = {};
  apiUrl: string = 'http://localhost:4000/graphql';
  showAddEmployeeModal: boolean = false;
  newEmployee: any = {};

  constructor(private http: HttpClient, private router: Router) {}

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

  openAddEmployeeModal(): void {
    this.showAddEmployeeModal = true;
    this.newEmployee = {}; // Reset new employee form
  }

  closeAddEmployeeModal(): void {
    this.showAddEmployeeModal = false;
  }

  submitAddEmployee(): void {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('No authToken found. User is not authenticated.');
      return;
    }

    const headers = new HttpHeaders({
      // Add the authToken to the Authorization header
      Authorization: `Bearer ${authToken}`
    });

    const mutation = `
      mutation AddEmployee(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $gender: String!,
        $designation: String!,
        $salary: Float!,
        $date_of_joining: String!,
        $department: String!,
        $employee_photo: String!
        ) {
        addEmployee(
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo: $employee_photo
        ) {
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
          created_at
          updated_at
        }
      }
    `;

    const payload = {
      query: mutation,
      variables: {
        first_name: this.newEmployee.first_name,
        last_name: this.newEmployee.last_name,
        email: this.newEmployee.email,
        gender: this.newEmployee.gender,
        designation: this.newEmployee.designation,
        salary: this.newEmployee.salary,
        date_of_joining: this.newEmployee.date_of_joining,
        department: this.newEmployee.department,
        employee_photo: this.newEmployee.employee_photo
      }
    };

    if (
      !this.newEmployee.first_name ||
      !this.newEmployee.last_name ||
      !this.newEmployee.email ||
      !this.newEmployee.gender ||
      !this.newEmployee.designation ||
      !this.newEmployee.salary ||
      !this.newEmployee.date_of_joining ||
      !this.newEmployee.department
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    this.http.post(this.apiUrl, payload, { headers }).subscribe({
      next: (response: any) => {
        if (response.data) {
          alert('Employee added successfully!');
          this.closeAddEmployeeModal();
          this.fetchEmployees(); // Refresh the employee list
        } else {
          alert('Failed to add employee.');
        }
      },
      error: (error) => {
        console.error('Error adding employee:', error.message);
        alert('An error occurred while adding the employee.');
      }
    });
  }

  updateEmployee(employeeId: string): void {
    // Logic to update an employee
    console.log(`Update Employee button clicked for ID: ${employeeId}`);
  }

  deleteEmployee(employeeId: string): void {
    // Logic to delete an employee
    console.log(`Delete Employee button clicked for ID: ${employeeId}`);
  }
}
