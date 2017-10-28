import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SessionProvider } from '../../providers/session/session';

@IonicPage({
  name: 'home-page'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  sessionList: Array<any> = [];
  loading: Loading;

  constructor(private nav: NavController,
    private auth: AuthService,
    private session: SessionProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.user = this.auth.getSignedInUser();
  }

  ionViewWillEnter() {
    this.showLoading();
    this.session.listSession().subscribe(data => {
      if(data.success) {
        this.loading.dismiss();
        this.sessionList = data.data;
        console.log(this.sessionList);
      } else {
        this.showError('Problem in loading sessions.');
      }
    }, err => {
      console.log(err);
    });
  }

  editSession(sessionId) {
    console.log('edit session', sessionId);
  }

  removeSession(session, index) {
    this.session.removeSession(session).subscribe( data => {
      if(!data.success) {
        this.showError(data.msg);
      } else {
        this.sessionList.splice(index, 1);
      }
    })
  }

  viewSession(session) {
    console.log('view session', session.id);
    this.nav.push('view-page', {session: session});
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  public logout() {
    this.nav.setRoot('login-page');
    this.auth.logout();
  }
}
