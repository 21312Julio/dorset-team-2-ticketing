import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ConfirmationMessageComponent } from './confirmation-message.component';

@NgModule({
  declarations: [
    ConfirmationMessageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    ConfirmationMessageComponent
  ]
})
export class ConfirmationMessageModule { }
