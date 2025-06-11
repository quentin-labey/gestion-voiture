import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showNavbar: boolean = true;
  currentUser? : User;
  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showNavbar = !this.router.url.startsWith('/login'); 
    });
    this.getCurrentUser();
  }


  getCurrentUser()
  {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

}
