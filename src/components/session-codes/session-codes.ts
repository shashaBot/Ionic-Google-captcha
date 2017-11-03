import { Component, EventEmitter, Input } from '@angular/core';
import { Loading, LoadingController, AlertController, Nav } from 'ionic-angular';

import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'session-codes',
  templateUrl: 'session-codes.html'
})
export class SessionCodesComponent {

  text: string;
  loading: Loading;
  sessionList: any[];
  @Input() qrCodes: any[];

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private sesSer: SessionProvider) {
    console.log('Hello SessionCodesComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
  }

  ngAfterViewInit () {
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
