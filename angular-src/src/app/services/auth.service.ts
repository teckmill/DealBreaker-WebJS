import { Injectable } from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  public user: any;
  profile: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/', user, {headers: headers})
      .map(res=> res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/auth', user, {headers: headers})
      .map(res=> res.json());
  }

  deleteUser(){
     let headers = new Headers();
     this.loadToken();
     headers.append('Authorization', this.authToken);
     return this.http.delete('http://localhost:3000/users/', {headers: headers})
      .map(res=> res.json());
  }

  getProfile(){
     let headers = new Headers();
     this.loadToken();
     headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/profile', {headers: headers})
      .map(res=> res.json());
  }

  getProfileById(id){
      let headers = new Headers();
      let params: URLSearchParams = new URLSearchParams();
      params.set('profile', id);

     this.loadToken();
     headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/profile',{search: params, headers: headers} )
      .map(res=> res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    this.authToken = localStorage.getItem('id_token'); 
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  loadProfile(){
    this.profile = localStorage.getItem('user');
  }

  loggedIn(){
    this.loadToken();
    
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
