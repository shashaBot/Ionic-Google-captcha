import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { AuthService } from '../auth-service/auth-service';

import 'rxjs/add/operator/map';

@Injectable()
export class SessionProvider {

  // public baseUrl: string = 'http://localhost:8080/';
  // public baseUrl: string = '';
  public baseUrl: string = 'https://ionic-node-auth.herokuapp.com/';

  constructor(public http: Http,
     private auth: AuthService) {
    console.log('Hello SessionProvider Provider');
  }

  createSession(session) {
    let headers = new Headers();
    headers.append('Authorization', this.auth.getToken());
    return this.http.post(this.baseUrl+'session/create', session, {headers: headers}).map(res => res.json());
  }

  createQrCodes() {
    return this.http.get(this.baseUrl+'session/generate-qr').map(res => res.json());
  }

  scannedQr (data) {
    let headers = new Headers();
    headers.append('Authorization', this.auth.getToken());
    return this.http.post(this.baseUrl+'session/scan-qr', {token: data}, {headers: headers}).map(res => res.json());
  }

  checkQr () {
    return this.http.get(this.baseUrl+'session/check-qr').map(res => res.json());
  }

  removeViewedToken(tokenId) {
    return this.http.post(this.baseUrl+'session/remove-viewed', {tokenId: tokenId}).map(res => res.json());
  }

  removeFile(file) {
    let headers = new Headers();
    headers.append('Authorization', this.auth.getToken());
    return this.http.post(this.baseUrl+'session/remove', {file: file}, {headers: headers}).map(res => res.json());
  }

  removeSession(session) {
    let headers = new Headers();
    headers.append('Authorization', this.auth.getToken());
    return this.http.post(this.baseUrl+'session/remove', {session: session}, {headers: headers}).map(res => res.json());
  }

  listSession() {
    let headers = new Headers();
    headers.append('Authorization', this.auth.getToken());
    return this.http.get(this.baseUrl+'session/list', {headers: headers}).map(res => res.json());
  }

  stream(file) {
    let headers = new Headers();
    headers.append('Authorization', this.auth.getToken());
    headers.append('Content-Range', 'bytes 0-50/1270');
    let resType: ResponseContentType = ResponseContentType['ArrayBuffer'];
    return this.http.get(this.baseUrl+'session/stream_files?path='+file.path, {headers: headers, responseType: resType})
        .map(res => {
          console.log(res);
          return res.arrayBuffer()
        });
  }

  viewSession(sessionId) {
    return this.http.get('/session/view').map(res => res.json());
  }
}
