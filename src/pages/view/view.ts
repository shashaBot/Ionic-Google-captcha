import { Component, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  private fileIndex: number = 0;
  @ViewChild('videoPlayer') videoPlayer;
  @ViewChild('audioPlayer') audioPlayer;
  @ViewChild('image') imageEl;
  @ViewChild('mediaContainer') mediaContainer;
  baseUrl: string = 'http://localhost:8080/';
  apiUrl: string = 'session/stream_files?path='

  constructor(public navCtrl: NavController, public navParams: NavParams, private sessionSer: SessionProvider, private ren: Renderer2) {

    this.session = this.navParams.get('session');
    // this.streamFile(this.fileIndex);
  }

  ngAfterViewInit() {
    // this.videoPlayer.onended = this.onFileEnd;
    console.log(this.videoPlayer);
    console.log(this.audioPlayer);
    console.log(this.imageEl);
    this.playFile(this.session.files[0]);
    console.log('session', this.session);
  }

  playFile (file) {
    if(!file) return;
    let mediaDiv = this.mediaContainer.nativeElement;
    let type = file.type;
    let mediaEl, sourceEl;
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
      mediaEl = this.ren.createElement('audio');
      sourceEl = this.ren.createElement('source');
      this.ren.setProperty(mediaEl, 'autoplay', 'true');
      this.ren.setProperty(mediaEl, 'controls', 'true');
      this.ren.setProperty(sourceEl, 'src', this.baseUrl+this.apiUrl+file.path);
      this.ren.appendChild(mediaEl, sourceEl);
      this.ren.listen(mediaEl, 'ended', (e) => {
        console.log('file ended!');
        this.fileIndex++;
        this.ren.removeChild(mediaDiv, mediaEl);
        this.playFile(this.session.files[this.fileIndex]);
      });
    }
    if(type.indexOf('video/') !== -1) {
      mediaEl = this.ren.createElement('video');
      sourceEl = this.ren.createElement('source');
      this.ren.setProperty(mediaEl, 'autoplay', 'true');
      this.ren.setProperty(mediaEl, 'controls', 'true');
      this.ren.setProperty(sourceEl, 'src', this.baseUrl+this.apiUrl+file.path);
      this.ren.appendChild(mediaEl, sourceEl);
      this.ren.listen(mediaEl, 'ended', (e) => {
        console.log('file ended!');
        this.fileIndex++;
        this.ren.removeChild(mediaDiv, mediaEl);
        this.playFile(this.session.files[this.fileIndex]);
      });
    }
    console.log(mediaEl.nativeElement);
    this.ren.appendChild(mediaDiv, mediaEl);
  }

  streamFile(index: number) : void {
    this.file = this.session.files[index];
    this.sessionSer.stream(this.file).subscribe( data => {
      this.dataUrl = this.makeDataUrl(data);
    });
  }

  onFileEnd () {
    console.log('file ended!');
    if(this.fileIndex !== this.session.files.length -1)
      this.fileIndex++;
    // this.streamFile(this.fileIndex);
  }

  onImageLoaded() {
    setTimeout(() => {
      this.onFileEnd();
    }, 5000);
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
