import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodePage } from './qrcode';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    QrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(QrcodePage),
    ComponentsModule,
  ],
  exports: [
    QrcodePage
  ]
})
export class QrcodePageModule {}
