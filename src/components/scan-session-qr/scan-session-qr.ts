import { Component, EventEmitter, Output } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'scan-session-qr',
  templateUrl: 'scan-session-qr.html'
})
export class ScanSessionQrComponent {

  @Output() qrScanned: EventEmitter<string> = new EventEmitter<string>();

  constructor(private qrScanner: QRScanner) {
    console.log('Hello ScanSessionQrComponent Component');
  }

  ngOnInit() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if(status.authorized) {
          //camera permission was granted

          let scanSub = this.qrScanner.scan().subscribe((data: string) => {
            console.log('something scanned!', data);
            this.qrScanned.emit(data);
            this.qrScanner.hide().then(status => {
              console.log('qrScanner status', status);
            });
            scanSub.unsubscribe();
          });

          this.qrScanner.show().then(status => {
            console.log('qrScanner status', status);
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
