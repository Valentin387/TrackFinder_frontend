import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  searchCriteria: any = {};
  searchResults: any[] = [];
  newSong: any = {};

  constructor() { }

  ngOnInit() { }

  onSearch() {
    // Implement logic to call your backend API with search criteria and update searchResults
    console.log('Search submitted:', this.searchCriteria);
    // Clear search results after submitting a new search
    this.searchResults = [];
  }

  onAddSong() {
    // Implement logic to call your backend API with new song data
    console.log('New song to add:', this.newSong);
    // Clear song data after submitting
    this.newSong = {};
  }

  clearSearchForm() {
    this.searchCriteria = {};
  }

  clearAddSongForm() {
    this.newSong = {};
  }

}
