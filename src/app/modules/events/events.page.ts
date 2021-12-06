import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePickerModal } from 'src/app/shared/date-picker-modal/date-picker-modal.component';
import { ApiService } from 'src/app/services/fetchdata/api.service';
import { getDate, toDate } from 'date-fns';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage{
  datauser: any;
  datadays: any;
  days: Array<string>;
  today = new Date();
  dateStr = (this.today.getFullYear()+'/'+(this.today.getMonth()+1)+'/'+this.today.getDate()).toString();

  constructor(private router: Router, private modalCtrl: ModalController, public api: ApiService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.getDataUser();
  }

  // ionViewWillEnter() {
  //   this.getDayName();
  // }

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
    const date = new Date(this.dateStr);
    const dateString = date.toLocaleDateString('en-IE', {weekday: 'short'});
    const tempDate = new Set();
    await this.api.getDataUser()
      .subscribe(res => {
        console.log(res);
        this.datauser = res.movies;
    console.log(this.datauser);
      }, err => {
        console.log(err);
      });
    await this.api.getDataUser()
      .subscribe(res => {
        this.datadays = res.movies;
        for (const value of Object.entries(this.datadays)) {
          for (const title of Object.entries(value[1])) {
            if (title[0] === 'runningTimes') {
              for (const dayNameTime of Object.entries(title[1])) {
                if (dayNameTime[0] === dateString) {
                  console.log(dayNameTime);
                }
              }
            }
          }
        };
      });
  }
}


