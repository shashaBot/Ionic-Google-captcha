import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public currentUser: any;
  authToken: string;
  public baseUrl: string = 'http://localhost:8080/';
  // public baseUrl: string = '';
  // public baseUrl: string = 'https://ionic-node-auth.herokuapp.com/';

  constructor( private http: Http){}
  public login(credentials) {
    if (credentials.password === null || credentials.username === null) {
      //show error toast
      return;
    } else {
      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post(this.baseUrl+'users/authenticate', credentials, {headers: headers}).map(res => res.json());
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null || credentials.name === null || credentials.username === null) {
      // show error toast
      return;
    } else {
      // At this point store the credentials to your backend!
      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post(this.baseUrl+'users/register', credentials, {headers: headers}).map(res => res.json());
    }
  }

  public getUserInfo() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get(this.baseUrl+'users/profile', {headers: headers}).map(res => res.json());
  }

  getSignedInUser() {
    return this.currentUser;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.currentUser = user;
  }

  loggedIn() {
    console.log(tokenNotExpired('id_token'));
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.currentUser = null;
    localStorage.clear();
  }

}
