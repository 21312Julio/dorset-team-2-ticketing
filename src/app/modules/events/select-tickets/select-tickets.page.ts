import { AngularFireAuth } from '@angular/fire/auth';
import { formatDateNoTZ, formatDayDateNoTZ } from 'src/app/utils/dateutils';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { EventBookingForm } from '../event.booking.form';
import { TicketBookedSuccessModalComponent } from '../ticket-booked-success-modal/ticket-booked-success-modal.component';

@Component({
  selector: 'app-select-tickets',
  templateUrl: './select-tickets.page.html',
  styleUrls: ['./select-tickets.page.scss'],
})
export class SelectTicketsPage {
  formatDayDateNoTZ = formatDayDateNoTZ;
  movieDetail: any;
  slot: any;
  totalPrice: number;
  selectedSeats: any[];
  currentUser: any;

  selectedAdultTickets: number = 0;
  selectedChildTickets: number = 0;
  selectedFamilyTickets: number = 0;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private loadingCtrl: LoadingController,
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private eventBookingForm: EventBookingForm
  ) {}

  async ionViewWillEnter(): Promise<void> {
    if (
      this.eventBookingForm.selectedEvent &&
      this.eventBookingForm.selectedSlot &&
      this.eventBookingForm.selectedSeats &&
      this.eventBookingForm.selectedDate
    ) {
      this.angularFireAuth.user.subscribe((u) => {
        this.currentUser = u;
      });
      const event = await this.angularFirestore
        .collection('movies')
        .doc(this.eventBookingForm.selectedEvent)
        .get()
        .toPromise();
      if (event.data()) {
        this.movieDetail = event.data();
      }
      this.slot = this.eventBookingForm.selectedSlot;
      this.selectedSeats = this.eventBookingForm.selectedSeats;
    } else {
      this.eventBookingForm.selectedDate = undefined;
      this.eventBookingForm.selectedEvent = undefined;
      this.eventBookingForm.selectedSlot = undefined;
      this.eventBookingForm.selectedSeats = undefined;
      this.router.navigateByUrl('/tabs/events');
    }
  }

  goBack() {
    this.router.navigateByUrl(
      '/tabs/events/pick-seats/' +
        this.eventBookingForm.selectedEvent +
        '?slot=' +
        this.eventBookingForm.selectedSlot
    );
  }

  async bookedSuccess() {
    const data: any = {
      event: this.eventBookingForm.selectedEvent,
      eventDate: this.eventBookingForm.selectedDate,
      selectedSeats: this.eventBookingForm.selectedSeats,
      childTickets: this.selectedChildTickets,
      adultTickets: this.selectedAdultTickets,
      familyTickets: this.selectedFamilyTickets,
      hall: this.movieDetail.hall,
      totalCost: this.getTotal(),
      movieName: this.movieDetail.movieName,
      bookingDate: formatDateNoTZ(new Date()),
      userEmail: this.currentUser.email,
    };
    let loadingView = await this.loadingCtrl.create();
    await loadingView.present();
    const result = await this.angularFirestore.collection('bookings').add(data);
    await loadingView.dismiss();
    if (result && result.id) {
      const modal = await this.modalController.create({
        component: TicketBookedSuccessModalComponent,
        cssClass: 'action-sheet action-sheet-sm',
        swipeToClose: true,
        mode: 'ios',
        componentProps: {
          bookingId: result.id,
        },
      });
      await modal.present();
      await modal.onDidDismiss();
      this.eventBookingForm.reset();
      this.router.navigateByUrl('/tabs/events');
    }
  }

  format(d: string): string | Date {
    const date = new Date(d);
    return date;
  }

  addAdultTicket() {
    if (
      this.selectedAdultTickets === 5 ||
      this.selectedAdultTickets === this.selectedSeats.length
    ) {
      return;
    }
    this.selectedAdultTickets = this.selectedAdultTickets + 1;
  }

  minusAdultTicket() {
    if (this.selectedAdultTickets === 0) {
      this.selectedChildTickets = 0;
      return;
    }
    this.selectedAdultTickets = this.selectedAdultTickets - 1;
  }

  addChildTicket() {
    if (
      this.selectedChildTickets === 4 ||
      this.selectedChildTickets === this.selectedSeats.length
    ) {
      return;
    }
    this.selectedChildTickets = this.selectedChildTickets + 1;
  }

  minusChildTicket() {
    if (this.selectedChildTickets === 0) {
      return;
    }
    this.selectedChildTickets = this.selectedChildTickets - 1;
  }

  addFamilyTicket() {
    if (this.selectedFamilyTickets === 1) {
      return;
    }
    this.selectedFamilyTickets = this.selectedFamilyTickets + 1;
  }

  minusFamilyTicket() {
    if (this.selectedFamilyTickets === 0) {
      return;
    }
    this.selectedFamilyTickets = this.selectedFamilyTickets - 1;
  }

  getTotal(): string {
    const adultPrice = parseFloat(this.movieDetail.adultSeat);
    const familyPrice = parseFloat(this.movieDetail.familySeat);
    const childPrice = parseFloat(this.movieDetail.childSeat);
    const total =
      adultPrice * this.selectedAdultTickets +
      familyPrice * this.selectedFamilyTickets +
      childPrice * this.selectedChildTickets;
    return `€${total.toFixed(2)}`;
  }

  totalTickets(): number {
    const familyTiclets =
      this.selectedFamilyTickets > 0 ? this.selectedFamilyTickets * 6 : 0;
    return (
      this.selectedAdultTickets + this.selectedChildTickets + familyTiclets
    );
  }
}
