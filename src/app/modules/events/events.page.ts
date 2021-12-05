import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePickerModal } from 'src/app/shared/date-picker-modal/date-picker-modal.component';
import { ApiService } from 'src/app/services/fetchdata/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage{
  datauser: any;
  constructor(private router: Router, private modalCtrl: ModalController, public api: ApiService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.getDataUser();
  }

  pickSeat(): void {
    this.router.navigateByUrl('/tabs/events/pick-seats');
  }

  async changeDate() {
    const modal = await this.modalCtrl.create({
      component: DatePickerModal,
      cssClass: 'action-sheet auto-height',
      swipeToClose: true,
      mode: 'ios',
    });
    await modal.present();
  }

  async getDataUser() {
    await this.api.getDataUser()
      .subscribe(res => {
        console.log(res);
        this.datauser = res.movies;
    console.log(this.datauser);
      }, err => {
        console.log(err);
      });
  }
}
