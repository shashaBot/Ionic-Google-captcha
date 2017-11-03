import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';

import { SessionProvider } from '../../providers/session/session';

@IonicPage({
  name: 'qrcode-page'
})
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  loading: Loading;
  sessionList: any[];
  scanned: boolean = false;
  scannedSession: any;
  qrCodes: any[];
  checkInterval: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public sesSer: SessionProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private ren: Renderer2) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage', this.plt.is('core'));
  }

  ionViewWillEnter() {
    if(this.plt.is('core')) {
      this.showLoading();
      this.sesSer.createQrCodes().subscribe( data => {
        if(data.success) {
          this.loading.dismiss();
          this.qrCodes = data.data;
          console.log(this.qrCodes);
        } else {
          this.showError('Error in displaying QR codes!');
        }
      });
      this.checkInterval = setInterval(() => {
        this.sesSer.checkQr().subscribe((res) => {
          if(res.success)
            this.onSessionScanned({session: res.session, token: res.token});
        })
      }, 3000);
    }
  }

  ionViewWillLeave() {
    if(this.plt.is('core')) {
      this.sesSer.removeAllTokens().subscribe(res => console.log(res));

      if(this.checkInterval){
        clearInterval(this.checkInterval)
      }
    }
  }

  onQrScanned(data) {
    // this.ren.setStyle(this.content.nativeElement, 'background-color', '#fff');
    this.scanned = true;
    console.log('onQrScanned', data);
    this.sesSer.scannedQr(data).subscribe( res => {
      if(res.success) {
        // display session information
        this.scannedSession = res.session;
        console.log(this.scannedSession);
      } else if(res.msg) {
        this.showError(res.msg);
      } else {
        this.showError('The QR code could not be verified! Try again.');
      }
    })
  }

  onSessionScanned(data) {
    //navigate to view session providing credentials from database.
    console.log('session scanned!', data);
    this.navCtrl.push('view-page', {session: data.session, token: data.token});
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
