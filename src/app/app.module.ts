import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
// import { RegisterPage } from '../pages/register/register';
// import { LoginPage } from '../pages/login/login';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
// import { CreatePage } from '../pages/create/create';

import { MyApp } from './app.component';
// import { IonCaptchaDirective } from '../directives/ion-captcha/ion-captcha';
import { SessionProvider } from '../providers/session/session';
// import { FileTransfer } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
// import { MediaCapture } from '@ionic-native/media-capture';
import { AuthService } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    // FileSelectDirective,
    // FileDropDirective,
    // RegisterPage,
    // LoginPage,
    // HomePage,
    // TabsPage,
    // CreatePage,
    // IonCaptchaDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      //tabs config
      tabsHideOnSubPages: true
    }),
    HttpModule,
    // FormsModule,
    // ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // RegisterPage,
    // LoginPage,
    // TabsPage,
    // CreatePage,
    // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    SessionProvider,
    // FileTransfer,
    // File,
    // MediaCapture
  ]
})
export class AppModule {}
