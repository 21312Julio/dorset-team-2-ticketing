import { ConfirmationMessageModule } from './../../shared/confirmation-message/confirmation-message.module';
import { ModalComponentModule } from './../../shared/modal-component/modal-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventsPage } from './events.page';
import { PickSeatsPage } from './pick-seats/pick-seats.page';
import { SelectTicketsPage } from './select-tickets/select-tickets.page';
import { TicketBookedSuccessModalComponent } from './ticket-booked-success-modal/ticket-booked-success-modal.component';
import { DatePickerModalModule } from 'src/app/shared/date-picker-modal/date-picker-modal.module';

const routes: Routes = [
  {
    path: '',
    component: EventsPage,
  },
  {
    path: 'pick-seats',
    component: PickSeatsPage,
  },
  {
    path: 'select-tickets',
    component: SelectTicketsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ModalComponentModule,
    ConfirmationMessageModule,
    DatePickerModalModule,
  ],
  declarations: [
    EventsPage,
    PickSeatsPage,
    SelectTicketsPage,
    TicketBookedSuccessModalComponent,
  ],
})
export class EventsPageModule {}
