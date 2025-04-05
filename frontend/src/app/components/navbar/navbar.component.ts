import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterModule, CommonModule]
})
export class NavbarComponent implements OnInit {
  isEmployeePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isEmployeePage = this.router.url === '/employees';
    });
  }

  getLogoRoute(): string {
    // Check if user is authenticated by checking localStorage for authToken
    return localStorage.getItem('authToken') ? '/employees' : '/login';
  }

  logout(): void {
    console.log('User logged out');
    // Clear authToken from localStorage
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
