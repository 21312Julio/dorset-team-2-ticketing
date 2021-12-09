import { Injectable } from '@angular/core';

@Injectable()
export class EventBookingForm {
  selectedSeats: any[];
  selectedSlot: any;
  selectedDate: any;
  selectedEvent: any;
  constructor() {}

  reset() {
    this.selectedSeats = undefined;
    this.selectedSlot = undefined;
    this.selectedDate = undefined;
    this.selectedEvent = undefined;
  }
}
