import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/services/forms/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  logo = './assets/images/cinePlex-logo.png';

  get form(): FormGroup {
    return this.loginForm.loginForm;
  }

  constructor(private router: Router, private loginForm: LoginForm) {}

  ionViewWillEnter() {
    this.loginForm.initializeForm();
  }

  async submitLoginForm() {
    await this.loginForm.submitLoginForm();
    this.router.navigateByUrl('/tabs/events');
    this.loginForm.initializeForm();
  }
}
