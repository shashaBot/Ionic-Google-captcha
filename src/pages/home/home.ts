import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  constructor(private nav: NavController, private auth: AuthService) {
    this.auth.getUserInfo().subscribe( data=> {
      this.user = data.user;
    });
  }

  public logout() {
    this.nav.setRoot(LoginPage);
    this.auth.logout();
  }
}
