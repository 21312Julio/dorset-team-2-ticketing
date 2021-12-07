import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePickerModal } from 'src/app/shared/date-picker-modal/date-picker-modal.component';
import { ApiService } from 'src/app/services/fetchdata/api.service';
import { getDate, toDate } from 'date-fns';
import * as $ from 'jquery';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage{
  set = new Set();
  finalData: any[] = [];
  datauser: any;
  datadays: any;
  days: any;
  today = new Date();
  dateStr = (this.today.getFullYear()+'/'+(this.today.getMonth()+1)+'/'+this.today.getDate()).toString();

  constructor(private router: Router, private modalCtrl: ModalController, public api: ApiService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.getDataUser();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    $(document).ready(function() {
    });
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
    const date = new Date(this.dateStr);
    const dateString = date.toLocaleDateString('en-IE', {weekday: 'short'});
    const tempDate: any[] = Array<any>();
    await this.api.getDataUser()
      .subscribe(res => {
        // console.log(res);
        this.datauser = res.movies;
    console.log(this.datauser);
      }, err => {
        console.log(err);
      });
    await this.api.getDataUser()
      .subscribe(res => {
        this.datadays = res.movies;
        for (const value of Object.entries(this.datadays)) {
          // console.log(value);
          for (const title of Object.entries(value[1])) {
            if (title[0] === 'runningTimes') {
              for (const dayNameTime of Object.entries(title[1])) {
                if (dayNameTime[0] === dateString) {
                  //console.log(dayNameTime);
                  tempDate.push(dayNameTime[1]);
                  //console.log(dayNameTime[1]);
                }
              }
            }
          }
        };
        let i = 0;
        let j = 0;
        for (const value of Object.entries(this.datadays)) {
          value.shift();
          while (i < 3) {
            if (j === 0 && i === 0) {
              value.push({timeOfDisplay: tempDate[0]});
              console.log(value);
              this.finalData.push(value);
            }
            if (j === 1 && i === 0) {
              value.push({timeOfDisplay: tempDate[1]});
              console.log(value);
              this.finalData.push(value);
            }
            if (j === 2 && i === 0) {
              value.push({timeOfDisplay: tempDate[2]});
              console.log(value);
              this.finalData.push(value);
            }
            i++;
            console.log(i);
          }
          i = 0;
          j++;
          console.log(j);
          console.log(this.finalData);
        }
        this.days = tempDate;
      });
  }

  // async createTimes(data) {
  //   console.log(data);
  //   for (const [key, value] of Object.entries(data)) {
  //     this.set.add(value);
  //   }
  //   for (const [key, value] of Object.entries(data)) {}
  //   console.log(this.set);
  //   const div = document.createElement('div');
  //   const times = data.split(',');
  //   // eslint-disable-next-line guard-for-in
  //   for (const x in times) {
  //     div.className = 'slot';
  //     div.innerText = x;
  //     document.getElementById('times').appendChild(div);
  //   }
  // }
}


