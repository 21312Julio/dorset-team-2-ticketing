import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { setFormErrors, validateAllFields } from 'src/app/utils/forms';

@Injectable({
  providedIn: 'root',
})
export class FormManager {
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  toastDuration: number = 5000;
  toastNonFieldErrors: boolean = true;

  // prettier-ignore
  public async submit(form: FormGroup, submitFn: () => Promise<void>, toast?: string): Promise<void> {
    await this.validateForm(form);
    if (form.valid) {
      let loadingView = await this.loadingCtrl.create();
      await loadingView.present();
      try {
        await submitFn();
        if (toast) await this.openToast(toast);
        await loadingView.dismiss();
      } catch (err) {
        await loadingView.dismiss();
        await this.handleError(form, err);
        throw err;
      }
    } else {
      throw "Invalid form.";
    }
  }

  public async validateForm(form: FormGroup): Promise<void> {
    validateAllFields(form);
  }

  protected async handleError(form: FormGroup, e: HttpErrorResponse) {
    switch (e.status) {
      case 400: {
        setFormErrors(form, e.error);
        if (e.error.non_field_errors) {
          await this.handleNonFieldErrors(e.error.non_field_errors);
        }
        break;
      }

      case 404: {
        await this.openToast(
          "Looks like the page you're trying to visit does not exist. Please check the URL and try again."
        );
        break;
      }

      case 403: {
        await this.openToast(e.error.detail);
        break;
      }

      case 500:
      case 429: {
        await this.openToast(
          'We are unable to process your request at this time. Please try again later'
        );
        break;
      }

      case 0: {
        await this.openToast(
          'We appreciate your patience and understanding. We are experiencing heavy traffic to our services. Please try again later.'
        );
        break;
      }

      default: {
        console.log(e);
        if ((e as any).code === 'auth/user-not-found') {
          await this.openToast('User not found.');
        }
        if ((e as any).code === 'auth/wrong-password') {
          await this.openToast('Password is incorrect');
        }
      }
    }
  }

  protected async handleNonFieldErrors(messages: string[]) {
    if (this.toastNonFieldErrors) {
      for (let msg of messages) {
        await this.openToast(msg);
      }
    }
  }

  protected async openToast(message: string) {
    if (message) {
      let toast = await this.toastCtrl.create({
        message: message,
        buttons: [{ text: 'Done', role: 'cancel' }],
        duration: this.toastDuration,
      });
      await toast.present();
    }
  }
}
