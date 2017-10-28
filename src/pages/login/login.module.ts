import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    FormsModule,
    ReactiveFormsModule,
    // DirectivesModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
