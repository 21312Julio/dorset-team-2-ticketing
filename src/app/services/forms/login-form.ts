import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormManager } from './form-manager';

@Injectable()
export class LoginForm {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formManager: FormManager,
    private userService: UserService
  ) {}

  public async initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public async submitLoginForm(): Promise<void> {
    let { email, password }: any = this.loginForm.value;
    let submitFn = async () => {
      await this.userService.login(email, password);
    };
    await this.formManager.submit(this.loginForm, submitFn);
  }
}
