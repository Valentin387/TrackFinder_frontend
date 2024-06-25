import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatExpansionModule } from '@angular/material/expansion';
import { GeneralUseService } from '../services/general-use/general-use.service'; // Import GeneralUseService

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatExpansionModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor(
    private generalUseService: GeneralUseService
  ) {}

  searchCriteria: any = {
    songTitle: '',
    artist: '',
    album: '',
    genre: '',
    releaseYear: ''
  };

  searchResults: any[] = [];

  newSong: any = {
    title: '',
    subtitle: '',
    bitrate: 0,
    year: '',
    commentaries: '',
    main_artist: '',
    collaborators: '',
    album_artist: '',
    album: '',
    track_number: '',
    genre: '',
    duration: 0,
    collection: '' // Initially empty string

  };

  newCollectionName: string = ''; // To store user-entered collection name
  existingCollections: string[] = [];

  ngOnInit() {
    this.getExistingCollections();
   }

  getExistingCollections() {
    this.generalUseService.get_collections().subscribe({
      next: (response) => {
        //console.log('Collections fetched:', response);
        this.existingCollections = response;
      },
      error: (error) => {
        console.error('Error fetching collections:', error);
        this.existingCollections = ['Favorites', 'Workout', 'Chill', 'Study', 'Party'];
      }
    });
  }

  onSearch() {
    // Implement logic to call your backend API with search criteria and update searchResults
    // Clear search results after submitting a new search

    let body : any = {
      name: this.searchCriteria.songTitle,
      title: this.searchCriteria.songTitle,
      sub_title: this.searchCriteria.songTitle,
      bitrate: 0,
      commentaries: "",
      main_artist: this.searchCriteria.artist,
      collaborators: this.searchCriteria.artist,
      album_artist: this.searchCriteria.artist,
      album: this.searchCriteria.album,
      //cast to string, avoid undefined error
      year: (this.searchCriteria.releaseYear !== null) ? this.searchCriteria.releaseYear.toString() : "",
      track_number: "",
      genre: this.searchCriteria.genre,
      duration: 0,
    };

    this.generalUseService.search_songs(body).subscribe({
      next: (response) => {
        this.searchResults = response;
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
        this.searchResults = [];
      }
    });
  }

  onAddSong() {
    this.newSong.year = (this.newSong.year !== null) ? this.newSong.year.toString() : "";

    console.log('Add song submitted:', this.newSong);
    if (this.newSong.collection) {
      // Logic to add song to existing collection using newSong.collection
      this.generalUseService.add_song(this.newSong).subscribe({
        next: (response) => {
          console.log('Song added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding song:', error);
        }
      });

    } else if (this.newCollectionName) {
      // Logic to create a new collection and add the song
      let newSong_with_new_collection: any = {
        title: this.newSong.title,
        subtitle: this.newSong.subtitle,
        bitrate: this.newSong.bitrate,
        year: (this.newSong.year !== null) ? this.newSong.year.toString() : "",
        commentaries: this.newSong.commentaries,
        main_artist: this.newSong.main_artist,
        collaborators: this.newSong.collaborators,
        album_artist: this.newSong.album_artist,
        album: this.newSong.album,
        track_number: this.newSong.track_number,
        genre: this.newSong.genre,
        duration: this.newSong.duration,
        collection: this.newCollectionName
      };

      this.generalUseService.add_song(newSong_with_new_collection).subscribe({
        next: (response) => {
          console.log('Song added successfully into the new collection:', response);
        },
        error: (error) => {
          console.error('Error adding song:', error);
        }
      });
    } else {
      // Handle case where user didn't select or provide a collection name
      console.warn('Please select or provide a collection name');
    }
    // Clear song data and potentially new collection name after submitting
    this.newSong = {};
    this.newCollectionName = '';
  }

  clearSearchForm() {
    this.searchCriteria = {};
  }

  clearAddSongForm() {
    this.newSong = {};
  }

  getCollectionName(collection: any): string {
    // Check if the collection has a key property (dictionary structure)
    if (collection.hasOwnProperty('key')) {
      return collection.key;
    } else {
      //console.log('it has NOT key property'); spoiler: it has not
      const keys = Object.keys(collection);
      return keys[0];
    }
  }


  getSongs(collection: any): any[] {
    // Access the song list directly from the collection object
    return collection[Object.keys(collection)[0]]; // Assuming the first key is the song list
  }

}
