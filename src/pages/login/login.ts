import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, Platform } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage({
  name: 'login-page'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  tabBarElement: any;

  captchaKey: string = '6LevrjQUAAAAAM5WB0Xu_ttsNRqpXeSPV6F0_zek';
  logIn: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    // captcha: new FormControl()
  });

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private plt: Platform) {
    if(this.plt.is('android')){
      this.captchaKey = '6Le1ajUUAAAAAFBJmWVU2NAZaMM0sHWDB4WBMqtU';
    }
  }

  // ionViewCanEnter(): boolean {
  //   if(this.auth.loggedIn()){
  //     this.nav.setRoot('home-page');
  //     return false;
  //   }
  //   return true;
  // }

  public createAccount() {
    this.nav.push('register-page');
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
        this.nav.setRoot('tabs-page');
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
