import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';  // Import MatSelectModule
import { RouterLink, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  selectedItem: string = '';

  constructor(private router: Router) { }  // Inject Router

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { // Check for NavigationEnd event
        this.selectedItem = event.urlAfterRedirects; // Update selectedItem
      }
    });
  }


}