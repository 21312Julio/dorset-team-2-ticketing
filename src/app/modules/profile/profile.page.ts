import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async logout() {
    let alertView = await this.alertCtrl.create({
      header: 'Log Out',
      message: 'Are you sure you want to log out?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Confirm', role: 'confirm' },
      ],
    });
    await alertView.present();
    let { role } = await alertView.onDidDismiss();
    if (role == 'confirm') {
      let loadingView = await this.loadingCtrl.create();
      await loadingView.present();
      setTimeout(async () => {
        this.router.navigateByUrl('/auth/login');
        await loadingView.dismiss();
      }, 1000);
    }
  }
}
