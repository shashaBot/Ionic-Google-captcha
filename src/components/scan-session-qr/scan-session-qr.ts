import { Component, EventEmitter, Output, Input } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'scan-session-qr',
  templateUrl: 'scan-session-qr.html'
})
export class ScanSessionQrComponent {
  @Input() scannedSession: any;
  @Output() qrScanned: EventEmitter<string> = new EventEmitter<string>();
  qrStatus: QRScannerStatus;
  scannerSub: Promise<QRScannerStatus>;
  scanSub: Subscription;
  isScanning: boolean = false;
  scanned: boolean = false;
  constructor(private qrScanner: QRScanner) {
    console.log('Hello ScanSessionQrComponent Component');
  }

  ngOnInit() {
    this.scannerSub = this.qrScanner.prepare();
  }

  startScanner () {
    this.scannerSub
      .then((status: QRScannerStatus) => {
        if(status.authorized && !status.scanning) {
          //camera permission was granted
          this.isScanning = true;
          this.scanned = true;
          this.scanSub = this.qrScanner.scan().subscribe((data: string) => {
            console.log('something scanned!', data);
            this.qrScanned.emit(data);
            this.qrScanner.hide().then(status => {
              console.log('qrScanner status', status);
              this.isScanning = false;
              window.document.querySelector('ion-app').classList.remove('transparentBody');
              window.document.querySelector('page-qrcode').classList.remove('transparentBody');
              window.document.querySelector('page-qrcode ion-content').classList.remove('transparentBody');
            });
            this.scanSub.unsubscribe();
          });

          this.qrScanner.show().then(status => {
            console.log('qrScanner status', status);
            window.document.querySelector('ion-app').classList.add('transparentBody');
            window.document.querySelector('page-qrcode').classList.add('transparentBody');
            window.document.querySelector('page-qrcode ion-content').classList.add('transparentBody');
          });

        } else if(status.denied) {
          // permission denied permanently
          console.log('status denied');
        } else {
          //permission denied but not permanently
          console.log('no status');
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

}
