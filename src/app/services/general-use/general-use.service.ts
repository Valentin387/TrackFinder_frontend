import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralUseService {


  constructor(private http: HttpClient) {}

  public baseUrl = 'http://127.0.0.1:8000/'; // Replace with your actual base URL


  search_songs(body: any): Observable<any> {
    let local_url = this.baseUrl + 'general_use/search_songs';
    return this.http.post<any>(local_url, body); 
  }

  add_song(body: any): Observable<any> {
    let local_url = this.baseUrl + 'general_use/add_song';
    return this.http.post<any>(local_url, body); 
  }

  get_collections(): Observable<any> {
    let local_url = this.baseUrl + 'general_use/collections';
    return this.http.get<any>(local_url); 
  }


}
