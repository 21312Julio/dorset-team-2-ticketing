import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from 'src/app/services/forms/login-form';
import { FormFieldsModule } from 'src/app/shared/form-fields/form-fields.module';
import { ModalComponentModule } from 'src/app/shared/modal-component/modal-component.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule,
    ModalComponentModule,
    RouterModule.forChild(routes),
  ],
  providers: [LoginForm],
})
export class AuthModule {}
