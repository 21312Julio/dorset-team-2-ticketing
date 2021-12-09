import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormManager } from './form-manager';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class RegisterForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formManager: FormManager,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  public async initializeForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public async submit(): Promise<void> {
    let data: any = this.form.value;
    let submitFn = async () => {
      const result =
        await this.angularFireAuth.auth.createUserWithEmailAndPassword(
          data.email,
          data.password
        );
      const user = await this.angularFirestore.collection('users').add({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    };
    await this.formManager.submit(
      this.form,
      submitFn,
      'Account created Successfully.'
    );
  }
}
