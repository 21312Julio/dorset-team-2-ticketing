import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TicketBookedSuccessModalComponent } from '../ticket-booked-success-modal/ticket-booked-success-modal.component';

@Component({
  selector: 'app-select-tickets',
  templateUrl: './select-tickets.page.html',
  styleUrls: ['./select-tickets.page.scss'],
})
export class SelectTicketsPage {
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}
  goBack() {
    this.router.navigateByUrl('/tabs/events/pick-seats');
  }

  async bookedSuccess() {
    const modal = await this.modalController.create({
      component: TicketBookedSuccessModalComponent,
      cssClass: 'action-sheet action-sheet-sm',
      swipeToClose: true,
      mode: 'ios',
    });
    await modal.present();
  }
}
