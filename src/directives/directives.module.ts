import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';

import { IonCaptchaDirective } from './ion-captcha/ion-captcha';

@NgModule({
	declarations: [IonCaptchaDirective],
	imports: [IonicModule],
	exports: [IonCaptchaDirective]
})
export class DirectivesModule {}
