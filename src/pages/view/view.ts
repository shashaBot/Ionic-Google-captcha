import { Component, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

@IonicPage({
  name: 'view-page'
})
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage implements AfterViewInit {
  public session;
  public file;
  public dataUrl;
  private token: string;

  public loading: Loading;
  public mediaLoading: Loading
  public leaving: Boolean = false;

  private fileIndex: number = 0;
  @ViewChild('videoPlayer') videoPlayer;
  @ViewChild('audioPlayer') audioPlayer;
  @ViewChild('image') imageEl;
  @ViewChild('mediaContainer') mediaContainer;
  // baseUrl: string = 'http://localhost:8080/';
  baseUrl: string = 'https://ionic-node-auth.herokuapp.com/';
  apiUrl: string = 'session/stream_files?path='

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sessionSer: SessionProvider,
    private ren: Renderer2,
    private loadingCtrl: LoadingController) {

    this.session = this.navParams.get('session');
    this.token = this.navParams.get('token');
    // this.streamFile(this.fileIndex);
  }

  ngAfterViewInit() {
    this.playFile(this.session.files[0]);
  }

  playFile (file) {
    if(!file) return this.navCtrl.pop();
    if(this.leaving) return;
    this.file = file;
    let mediaDiv = this.mediaContainer.nativeElement;
    let type = file.type;
    let mediaEl, sourceEl, audioImg;
    if(type.indexOf('image/') !== -1){
      mediaEl = this.ren.createElement('img');
      this.ren.setAttribute(mediaEl, 'src', this.baseUrl+this.apiUrl+file.path);
      this.ren.listen(mediaEl, 'load', (e) => {
        setTimeout(() => {
          console.log('file ended!');
          this.fileIndex++;
          this.ren.removeChild(mediaDiv, mediaEl);
          this.playFile(this.session.files[this.fileIndex]);
        }, 5000);
      });
    }
    if(type.indexOf('audio/') !== -1){
      if(!mediaEl)
        mediaEl = this.ren.createElement('audio');
      if(!sourceEl)
        sourceEl = this.ren.createElement('source');
      this.ren.setProperty(mediaEl, 'autoplay', 'true');
      // this.ren.setProperty(mediaEl, 'controls', 'true');
      this.ren.setProperty(sourceEl, 'src', this.baseUrl+this.apiUrl+file.path);
      this.ren.appendChild(mediaEl, sourceEl);
      if(!audioImg){
        audioImg = this.ren.createElement('img');
        this.ren.setAttribute(audioImg, 'src', 'assets/icon/headphones-icon.png');
        this.ren.addClass(audioImg, 'audio-img');
      }
      this.ren.appendChild(mediaDiv, audioImg);
      this.ren.listen(mediaEl, 'ended', (e) => {
        console.log('file ended!');
        this.fileIndex++;
        this.ren.removeChild(mediaDiv, audioImg);
        this.ren.removeChild(mediaDiv, mediaEl);
        this.playFile(this.session.files[this.fileIndex]);
      });
      this.ren.listen(mediaEl, 'loadstart', (e) => {
        if(!this.mediaLoading)
          this.showMediaLoading();
      })
      this.ren.listen(mediaEl, 'play', (e) => {
        if(this.mediaLoading)
          this.mediaLoading.dismiss();
      });
      this.ren.listen(mediaEl, 'waiting', (e) => {
        if(!this.mediaLoading)
          this.showMediaLoading();
      });
    }
    if(type.indexOf('video/') !== -1) {
      mediaEl = this.ren.createElement('video');
      sourceEl = this.ren.createElement('source');
      this.ren.setProperty(mediaEl, 'autoplay', 'true');
      // this.ren.setProperty(mediaEl, 'controls', 'true');
      this.ren.setProperty(sourceEl, 'src', this.baseUrl+this.apiUrl+file.path);
      this.ren.appendChild(mediaEl, sourceEl);
      this.ren.listen(mediaEl, 'ended', (e) => {
        console.log('file ended!');
        this.fileIndex++;
        this.ren.removeChild(mediaDiv, mediaEl);
        this.playFile(this.session.files[this.fileIndex]);
      });
      this.ren.listen(mediaEl, 'loadstart', (e) => {
        this.showMediaLoading();
      })
      this.ren.listen(mediaEl, 'play', (e) => {
        if(this.mediaLoading)
          this.mediaLoading.dismiss();
      });
      this.ren.listen(mediaEl, 'waiting', (e) => {
        if(!this.mediaLoading)
          this.showMediaLoading();
      });
    }
    this.ren.appendChild(mediaDiv, mediaEl);
  }

  // streamFile(index: number) : void {
  //   this.file = this.session.files[index];
  //   this.sessionSer.stream(this.file).subscribe( data => {
  //     this.dataUrl = this.makeDataUrl(data);
  //   });
  // }

  onFileEnd () {
    console.log('file ended!');
    if(this.fileIndex !== this.session.files.length -1)
      this.fileIndex++;
    // this.streamFile(this.fileIndex);
  }

  onImageLoaded() {
    if(this.loading)
      this.loading.dismiss();
    setTimeout(() => {
      this.onFileEnd();
    }, 5000);
  }

  // makeDataUrl(buffer) {
  //   var binary = '';
  //   var bytes = new Uint8Array( buffer );
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //       binary += String.fromCharCode( bytes[ i ] );
  //   }
  //   return window.btoa( binary );
  // }

  ionViewDidLoad() {
    this.leaving = false;
    console.log('ionViewDidLoad ViewPage');
  }

  ionViewWillLeave() {
    this.leaving = true;
    // if(this.token) {
    //   this.sessionSer.removeViewedToken(this.token).subscribe( res => {
    //     console.log(res);
    //   });
    // }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showMediaLoading () {
    this.mediaLoading = this.loadingCtrl.create({
      content: 'Buffering...',
      spinner: 'circles',
      dismissOnPageChange: false
    });
    this.mediaLoading.present();
  }

}
