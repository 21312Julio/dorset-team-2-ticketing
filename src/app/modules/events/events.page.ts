import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePickerModal } from 'src/app/shared/date-picker-modal/date-picker-modal.component';
import { formatDateNoTZ } from 'src/app/utils/dateutils';
import { EventBookingForm } from './event.booking.form';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage {
  allMovies: any[];
  formatDateNoTZ = formatDateNoTZ;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private eventBookingForm: EventBookingForm,
    private fireStore: AngularFirestore
  ) {}

  pickSeat(slot: string, id: string, date: string): void {
    this.eventBookingForm.selectedDate = date;
    this.eventBookingForm.selectedEvent = id;
    this.eventBookingForm.selectedSlot = slot;
    this.router.navigateByUrl(
      '/tabs/events/pick-seats/' + id + '?slot=' + slot
    );
  }

  async changeDate() {
    const modal = await this.modalCtrl.create({
      component: DatePickerModal,
      cssClass: 'action-sheet auto-height',
      swipeToClose: true,
      mode: 'ios',
    });
    await modal.present();
    let data = await modal.onDidDismiss();
    if (data && data.data) {
      const filterDate = this.formatDateNoTZ(data.data);
      this.eventBookingForm.selectedDate = filterDate;
      await this.getMoviesByDate(filterDate);
    } else {
      this.eventBookingForm.selectedDate = undefined;
      await this.getMovies();
    }
  }

  async ionViewWillEnter() {
    await this.getMovies();
  }

  async getMovies() {
    this.allMovies = undefined;
    const movies: any = [];
    const moviesCollection = await this.fireStore
      .collection('movies')
      .get()
      .toPromise();
    moviesCollection.forEach((val) => {
      let doc = val.data();
      movies.push({ ...doc, id: val.id });
    });
    this.allMovies = movies;
  }

  async getMoviesByDate(date: string) {
    this.allMovies = undefined;
    const movies: any = [];
    const moviesCollection = await this.fireStore
      .collection('movies', (ref) => ref.where('date', '==', date))
      .get()
      .toPromise();
    moviesCollection.forEach((val) => {
      let doc = val.data();
      movies.push({ ...doc, id: val.id });
    });
    this.allMovies = movies;
  }
}
