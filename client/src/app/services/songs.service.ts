import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Songs } from '../models/Songs';


@Injectable({
  providedIn: 'root'
})
export class SongsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // it pass as a parameter the interface from users and its variables to be able to inject it in the components
  addSong(songs: Songs) {
    return this.http.post(`${this.API_URI}/songs`, songs);
  }

}
