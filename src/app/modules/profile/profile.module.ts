import { ModalComponentModule } from './../../shared/modal-component/modal-component.module';
import { FormFieldsModule } from 'src/app/shared/form-fields/form-fields.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import { ShortNamePipeModule } from 'src/app/pipes/short-name.pipe';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    FormFieldsModule,
    ShortNamePipeModule,
    ModalComponentModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
