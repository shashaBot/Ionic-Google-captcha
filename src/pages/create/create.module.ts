import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePage } from './create';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    CreatePage,
    // FileSelectDirective,
    // FileDropDirective
  ],
  imports: [
    IonicPageModule.forChild(CreatePage),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  exports: [
    CreatePage
  ]
})
export class CreatePageModule {}
