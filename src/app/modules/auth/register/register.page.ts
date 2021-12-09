import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/services/forms/login-form';
import { RegisterForm } from 'src/app/services/forms/register-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [RegisterForm],
})
export class RegisterPage {
  logo = './assets/images/cinePlex-logo.png';

  get form(): FormGroup {
    return this.registerForm.form;
  }

  constructor(private router: Router, private registerForm: RegisterForm) {}

  ionViewWillEnter() {
    this.registerForm.initializeForm();
  }

  async submitRegisterForm() {
    await this.registerForm.submit();
    this.router.navigateByUrl('/tabs/events');
    this.registerForm.initializeForm();
  }
}
