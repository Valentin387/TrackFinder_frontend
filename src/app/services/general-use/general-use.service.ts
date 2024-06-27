import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralUseService {


  constructor(private http: HttpClient) {} //test comment

  public baseUrl = 'https://trackfinder-backend-d6f24f57e5c6.herokuapp.com/'; // Replace with your actual base URL


  search_songs(body: any): Observable<any> {
    let local_url = this.baseUrl + 'general_use/search_songs';
    return this.http.post<any>(local_url, body); 
  }

  add_song(body: any, collectionName: string): Observable<any> {
    let local_url = this.baseUrl + 'general_use/add_song';
    let params = new HttpParams().set('collection_name', collectionName);
    return this.http.post<any>(local_url, body,  { params } ); 
  }

  get_collections(): Observable<any> {
    let local_url = this.baseUrl + 'general_use/collections';
    return this.http.get<any>(local_url); 
  }


}
