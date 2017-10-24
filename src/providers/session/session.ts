import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AuthService } from '../auth-service/auth-service';

import 'rxjs/add/operator/map';

@Injectable()
export class SessionProvider {

  public baseUrl: string = 'http://localhost:8080/';
  // public baseUrl: string = '';
  // public baseUrl: string = 'https://ionic-node-auth.herokuapp.com/';

  constructor(public http: Http, private transfer: FileTransfer, private file: File, private auth: AuthService) {
    console.log('Hello SessionProvider Provider');
  }

  fileTransfer: FileTransferObject = this.transfer.create();

  upload(filePath: string) {
    let options: FileUploadOptions = {
       fileKey: 'sessionFile',
       fileName: Date.now()+'',
       mimeType: 'image/jpeg',
       headers: {Authorization: this.auth.getToken()}
    }

    return this.fileTransfer.upload(filePath, this.baseUrl+'session/create', options, true);
  }

  createSession(session) {
    let headers = new Headers();
    headers.append('Authorization', this.auth.getToken());
    return this.http.post(this.baseUrl+'session/create', session, {headers: headers}).map(res => res.json());
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
        .map(res => res.arrayBuffer());
  }

  viewSession(sessionId) {
    return this.http.get('/session/view').map(res => res.json());
  }
}
