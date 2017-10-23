import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, Loading, LoadingController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage({
  name: 'register-page'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  loading: Loading;
  captchaKey: string = '6LevrjQUAAAAAM5WB0Xu_ttsNRqpXeSPV6F0_zek';

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    // captcha: new FormControl()
  });

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private plt: Platform) {
    if(this.plt.is('android')){
      this.captchaKey = '6Le1ajUUAAAAAFBJmWVU2NAZaMM0sHWDB4WBMqtU';
    }
  }


  // ionViewCanEnter(): boolean {
  //   if(this.auth.loggedIn()){
  //     this.nav.setRoot(HomePage);
  //     return false;
  //   }
  //   else return true;
  // }

  public register() {
    this.showLoading();
    if(!this.registerForm.valid) return this.showError('Please provide all details and verify your humanity.');
    let credentials = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name
    }
    this.auth.register(credentials).subscribe(data => {
      if (data.success) {
        this.createSuccess = true;
        this.showPopup("Success", data.msg);
      } else {
        this.showPopup("Error", data.msg);
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
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
