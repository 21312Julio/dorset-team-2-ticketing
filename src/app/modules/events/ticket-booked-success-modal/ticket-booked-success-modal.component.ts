import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmationMessagesProperties } from 'src/app/shared/confirmation-message/confirmation-message.component';

@Component({
  selector: 'app-ticket-booked-succeess-modal',
  templateUrl: './ticket-booked-success-modal.component.html',
  styleUrls: ['./ticket-booked-success-modal.component.scss'],
})
export class TicketBookedSuccessModalComponent implements OnInit {
  @Input() bookingId: any;
  modalTitle: string;

  footerDisabled = true;

  message: ConfirmationMessagesProperties;

  constructor(private modalController: ModalController) {}

  cancel() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    if (this.bookingId) {
      this.message = {
        icon: './assets/images/cinePlex-logo.png',
        title:
          'Thank you for booking with CinePlex, your  refrence number is ' +
          this.bookingId,
        text1: '',
        text2: '',
        buttonLink: '/tabs/events',
        buttonName: 'Continue',
      };
    }
  }
}
