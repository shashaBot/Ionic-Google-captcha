import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    FormsModule,
    ReactiveFormsModule,
    // DirectivesModule
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
