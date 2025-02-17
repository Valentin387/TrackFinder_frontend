import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatExpansionModule } from '@angular/material/expansion';
import { GeneralUseService } from '../services/general-use/general-use.service'; // Import GeneralUseService
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component'; // Import ConfirmationDialogComponent
import { SpinnerComponent } from '../spinner/spinner.component'; // Import SpinnerComponent

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatExpansionModule, SpinnerComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor(
    private generalUseService: GeneralUseService,
    private dialog: MatDialog
  ) {}

  //ngModel for the form
  searchCriteria: any = {
    songTitle: '',
    artist: '',
    album: '',
    genre: '',
    releaseYear: ''
  };

  searchResults: any[] = [];

  //ngModel for the form
  newSong: any = {
    name: '',
    title: '',
    sub_title: '',
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

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onAddSong() {
    
    let newSong_data: any = {
      //name: this.newSong.title !== null ? this.newSong.title : "",
      title: this.newSong.title !== null ? this.newSong.title : "",
      sub_title: this.newSong.sub_title !== null ? this.newSong.sub_title : "",
      bitrate: this.newSong.bitrate !== null ? this.newSong.bitrate : 0, 
      year: this.newSong.year !== null ? this.newSong.year.toString() : "",
      commentaries: this.newSong.commentaries !== null ? this.newSong.commentaries : "",
      main_artist: this.newSong.main_artist !== null ? this.newSong.main_artist : "",
      collaborators: this.newSong.collaborators !== null ? this.newSong.collaborators : "",
      album_artist: this.newSong.album_artist !== null ? this.newSong.album_artist : "",
      album: this.newSong.album !== null ? this.newSong.album : "",
      track_number: this.newSong.track_number !== null ? this.newSong.track_number.toString() : "",
      genre: this.newSong.genre !== null ? this.newSong.genre : "",
      duration: this.newSong.duration !== null ? this.newSong.duration : 0, 
    };


    if (this.newSong.collection) {
      // Logic to add song to existing collection using newSong.collection
      this.generalUseService.add_song(newSong_data, this.newSong.collection).subscribe({
        next: (response) => {
          console.log('Song added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding song:', error);
        }
      });

    } else if (this.newCollectionName) {
      // Logic to create a new collection and add the song
      this.generalUseService.add_song(newSong_data, this.newCollectionName).subscribe({
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

      this.searchCriteria.songTitle = '';
      this.searchCriteria.artist = '';
      this.searchCriteria.album = '';
      this.searchCriteria.genre = '';
      this.searchCriteria.releaseYear = '';

  }

  clearAddSongForm() {
    this.newSong.name = '';
    this.newSong.title = '';
    this.newSong.sub_title = '';
    this.newSong.bitrate = 0;
    this.newSong.year = '';
    this.newSong.commentaries = '';
    this.newSong.main_artist = '';
    this.newSong.collaborators = '';
    this.newSong.album_artist = '';
    this.newSong.album = '';
    this.newSong.track_number = '';
    this.newSong.genre = '';
    this.newSong.duration = 0;
    this.newSong.collection = '';
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

  //Create a method in your component to open the popup message:
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to add this song to the database?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Reset all logic goes here
        this.onAddSong();
      }
    });
  }


}
