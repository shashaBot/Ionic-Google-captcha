import { Component, EventEmitter, Output } from '@angular/core';
import { Loading, LoadingController, AlertController } from 'ionic-angular';

import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'session-codes',
  templateUrl: 'session-codes.html'
})
export class SessionCodesComponent {

  text: string;
  loading: Loading;
  sessionList: any[];
  qrCodes: any[];
  @Output() scannedSession: EventEmitter<any> = new EventEmitter();

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private sesSer: SessionProvider) {
    console.log('Hello SessionCodesComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.showLoading();
    // this.sesSer.listSession().subscribe( data => {
    //   if(data.success){
    //     this.loading.dismiss();
    //     this.sessionList = data.data;
    //   } else {
    //     this.showError('Problem fetching data!');
    //   }
    // });

    this.sesSer.createQrCodes().subscribe( data => {
      if(data.success) {
        this.loading.dismiss();
        this.qrCodes = data.data;
        console.log(this.qrCodes);
      } else {
        this.showError('Error in displaying QR codes!');
      }
    })

    setInterval(() => {
      this.sesSer.checkQr().subscribe((res) => {
        if(res.success)
          this.scannedSession.emit({session: res.session, token: res.token});
      })
    }, 3000);
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
