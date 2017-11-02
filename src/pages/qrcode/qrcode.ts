import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';

import { SessionProvider } from '../../providers/session/session';

@IonicPage({
  name: 'qrcode-page'
})
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage implements AfterViewInit {

  loading: Loading;
  sessionList: any[];
  scanned: boolean = false;
  scannedSession: any;
  @ViewChild('content') content: ElementRef;

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
  }

  ionViewWillLeave() {
    window.document.querySelector('ion-app').classList.remove('transparentBody');
  }

  ngAfterViewInit() {
    if(this.plt.is('mobile')) {
      this.ren.setStyle(this.content.nativeElement, 'background-color', 'transparent');
      window.document.querySelector('ion-app').classList.add('transparentBody');
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
    this.navCtrl.setRoot('view-page', {session: data.session, token: data.token});
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
