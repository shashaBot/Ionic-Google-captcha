import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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
  qrCodes: any[];
  checkInterval:any;

  @ViewChild(Nav) nav: Nav;
  @Output() scannedSession: EventEmitter<any> = new EventEmitter();

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private sesSer: SessionProvider) {
    console.log('Hello SessionCodesComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.showLoading();

    this.sesSer.createQrCodes().subscribe( data => {
      if(data.success) {
        this.loading.dismiss();
        this.qrCodes = data.data;
        console.log(this.qrCodes);
      } else {
        this.showError('Error in displaying QR codes!');
      }
    })

    this.checkInterval = setInterval(() => {
      this.sesSer.checkQr().subscribe((res) => {
        if(res.success)
          this.scannedSession.emit({session: res.session, token: res.token});
      })
    }, 3000);
  }

  ngAfterViewInit () {
    // this.nav.viewWillEnter.subscribe( view => {
    //   console.log(view);
    // })
    // this.nav.viewWillLeave.subscribe( view => {
    //   console.log(view);
    //   if(this.checkInterval)
    //     clearInterval(this.checkInterval);
    // })
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
