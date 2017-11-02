import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { SessionCodesComponent } from './session-codes/session-codes';
import { ScanSessionQrComponent } from './scan-session-qr/scan-session-qr';

import { QRCodeModule } from 'angular2-qrcode';
import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
	declarations: [SessionCodesComponent,
    ScanSessionQrComponent],
	imports: [
		IonicModule,
		QRCodeModule
	],
	exports: [SessionCodesComponent,
    ScanSessionQrComponent,
	],
	providers: [QRScanner]
})
export class ComponentsModule {}
