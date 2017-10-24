import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

@IonicPage({
  name: 'view-page'
})
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  public session;
  public file;
  public dataUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sessionSer: SessionProvider) {

    this.session = this.navParams.get('session');
    this.file = this.session.files[0];
    this.sessionSer.stream(this.file).subscribe( data => {
      this.dataUrl = this.makeDataUrl(data);
    });
  }

  makeDataUrl( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }

}
