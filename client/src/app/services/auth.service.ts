import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Event } from '../models/event';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:3000/api';


  constructor( private http: HttpClient) { }

 // it pass as a parameter the interface from users and its variables to be able to inject it in the components
  createUser(user: User) {
   return this.http.post(`${this.API_URI}/users`, user);

   }

   CreateEvent(event: Event) {
    return this.http.post(`${this.API_URI}/events`, event);
  }

}
