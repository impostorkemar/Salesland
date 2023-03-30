import { Component } from '@angular/core';
import { TestuserService } from 'src/app/services/testuser.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(   
    private testuserService:TestuserService,
    private router:Router,
    private authService: AuthService
    ) {

    }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
