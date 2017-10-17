import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
// import { RECAPTCHA_URL } from '../../directives/ion-captcha/ion-captcha';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  // providers: [{
  //   provide: RECAPTCHA_URL,
  //   useValue: '/validate_captcha'
  // }]
})
export class LoginPage {
  loading: Loading;

  logIn: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    captcha: new FormControl()
  });

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  // ionViewCanEnter(): boolean {
  //   if(this.auth.loggedIn()){
  //     this.nav.setRoot(HomePage);
  //     return false;
  //   }
  //   else return true;
  // }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading();
    if(!this.logIn.valid) return;
    let credentials = {
      username: this.logIn.value.username,
      password: this.logIn.value.password
    };
    this.auth.login(credentials).subscribe(data => {
      if (data.success) {
        this.auth.storeUserData(data.token, data.user);
        this.nav.setRoot(HomePage);
      } else {
        this.showError(data.msg);
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
