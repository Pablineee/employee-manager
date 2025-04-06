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
  showEditEmployeeModal: boolean = false;
  editEmployeeId: string = '';
  editEmployee: any = {};
  existingEmployee: any = {};
  showDeleteEmployeeModal: boolean = false;
  deleteEmployeeId: string = '';
  showEmployeeDetailsModal: boolean = false;
  employeeDetails: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // Redirect to login page if not authenticated
      this.router.navigate(['/login']);
    }
  
    // Fetch employees when component is loaded and user is authenticated
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

  // Add new employee - Begin

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

  // Add new employee - End

  // Update Existing employee - Begin

  openEditEmployeeModal(employee: any): void {
    this.showAddEmployeeModal = false;
    this.editEmployeeId = employee.employeeId;
    this.existingEmployee = { ...employee };
    this.showEditEmployeeModal = true;
    this.showDeleteEmployeeModal = false;
  }

  closeEditEmployeeModal(): void {
    this.showEditEmployeeModal = false;
    this.editEmployeeId = '';
    this.existingEmployee = {};
    this.editEmployee = {};
  }

  submitEditEmployee(): void {
    const authToken = localStorage.getItem('authToken');
    
    if (this.editEmployeeId === '') {
      console.error('No employee ID found. Cannot edit employee.');
      return;
    }

    if (!authToken) {
      console.error('No authToken found. User is not authenticated.');
      return;
    }

    const headers = new HttpHeaders({
      // Add the authToken to the Authorization header
      Authorization: `Bearer ${authToken}`
    });

    const mutation = `
      mutation UpdateEmployee(
        $id: ID!,
        $first_name: String,
        $last_name: String,
        $email: String,
        $gender: String,
        $designation: String,
        $salary: Float,
        $date_of_joining: String,
        $department: String,
        $employee_photo: String
        ) {
        updateEmployee(
          id: $id,
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
        id: this.editEmployeeId,
        first_name: this.editEmployee.first_name,
        last_name: this.editEmployee.last_name,
        email: this.editEmployee.email,
        gender: this.editEmployee.gender,
        designation: this.editEmployee.designation,
        salary: this.editEmployee.salary,
        date_of_joining: this.editEmployee.date_of_joining,
        department: this.editEmployee.department,
        employee_photo: this.editEmployee.employee_photo
      }
    };

    if (
      !this.editEmployee.first_name &&
      !this.editEmployee.last_name &&
      !this.editEmployee.email &&
      !this.editEmployee.gender &&
      !this.editEmployee.designation &&
      !this.editEmployee.salary &&
      !this.editEmployee.date_of_joining &&
      !this.editEmployee.department
    ) {
      alert('No fields to update.');
      return;
    }

    this.http.post(this.apiUrl, payload, { headers }).subscribe({
      next: (response: any) => {
        if (response.data) {
          alert('Employee updated successfully!');
          this.closeEditEmployeeModal();
          this.fetchEmployees(); // Refresh the employee list
        } else {
          alert('Failed to update employee.');
        }
      },
      error: (error) => {
        console.error('Error updating employee:', error.message);
        alert('An error occurred while updating the employee.');
      }
    });
  }

  // Update Existing employee - End

  // Delete Existing employee - Begin

  openDeleteEmployeeModal(employeeId: string): void {
    this.showAddEmployeeModal = false;
    this.deleteEmployeeId = employeeId;
    this.showEditEmployeeModal = false;
    this.showDeleteEmployeeModal = true;
  }

  closeDeleteEmployeeModal(): void {
    this.showDeleteEmployeeModal = false;
    this.deleteEmployeeId = '';
  }

  submitDeleteEmployee(): void {
    const authToken = localStorage.getItem('authToken');
    
    if (this.deleteEmployeeId === '') {
      console.error('No employee ID found. Cannot delete employee.');
      return;
    }

    if (!authToken) {
      console.error('No authToken found. User is not authenticated.');
      return;
    }

    const headers = new HttpHeaders({
      // Add the authToken to the Authorization header
      Authorization: `Bearer ${authToken}`
    });

    const mutation = `
      mutation DeleteEmployee(
        $id: ID!
        ) {
        deleteEmployee(
          id: $id
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
        id: this.deleteEmployeeId
      }
    };

    this.http.post(this.apiUrl, payload, { headers }).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.closeDeleteEmployeeModal();
          this.fetchEmployees(); // Refresh the employee list
        } else {
          alert('Failed to delete employee.');
        }
      },
      error: (error) => {
        console.error('Error deleting employee:', error.message);
        alert('An error occurred while deleting the employee.');
      }
    });
  }

  // Delete Existing employee - End
}
