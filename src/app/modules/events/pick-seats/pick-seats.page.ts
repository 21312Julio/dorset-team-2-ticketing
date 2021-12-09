import { EventBookingForm } from './../event.booking.form';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pick-seats',
  templateUrl: './pick-seats.page.html',
  styleUrls: ['./pick-seats.page.scss'],
})
export class PickSeatsPage {
  seats: any[] = [
    {
      id: 'A1',
      selected: false,
      booked: false,
    },
    {
      id: 'A2',
      selected: false,
      booked: false,
    },
    {
      id: 'A3',
      selected: false,
      booked: false,
    },
    {
      id: 'A4',
      selected: false,
      booked: false,
    },
    {
      id: 'A5',
      selected: false,
      booked: false,
    },
    {
      id: 'A6',
      selected: false,
      booked: false,
    },
    {
      id: 'A7',
      selected: false,
      booked: false,
    },
    {
      id: 'A8',
      selected: false,
      booked: false,
    },
    {
      id: 'A9',
      selected: false,
      booked: false,
    },
    {
      id: 'A10',
      selected: false,
      booked: false,
    },
    {
      id: 'B1',
      selected: false,
      booked: false,
    },
    {
      id: 'B2',
      selected: false,
      booked: false,
    },
    {
      id: 'B3',
      selected: false,
      booked: false,
    },
    {
      id: 'B4',
      selected: false,
      booked: false,
    },
    {
      id: 'B5',
      selected: false,
      booked: false,
    },
    {
      id: 'B6',
      selected: false,
      booked: false,
    },
    {
      id: 'B7',
      selected: false,
      booked: false,
    },
    {
      id: 'B8',
      selected: false,
      booked: false,
    },
    {
      id: 'B9',
      selected: false,
      booked: false,
    },
    {
      id: 'B10',
      selected: false,
      booked: false,
    },
    {
      id: 'C1',
      selected: false,
      booked: false,
    },
    {
      id: 'C2',
      selected: false,
      booked: false,
    },
    {
      id: 'C3',
      selected: false,
      booked: false,
    },
    {
      id: 'C4',
      selected: false,
      booked: false,
    },
    {
      id: 'C5',
      selected: false,
      booked: false,
    },
    {
      id: 'C6',
      selected: false,
      booked: false,
    },
    {
      id: 'C7',
      selected: false,
      booked: false,
    },
    {
      id: 'C8',
      selected: false,
      booked: false,
    },
    {
      id: 'C9',
      selected: false,
      booked: false,
    },
    {
      id: 'C10',
      selected: false,
      booked: false,
    },
    {
      id: 'D1',
      selected: false,
      booked: false,
    },
    {
      id: 'D2',
      selected: false,
      booked: false,
    },
    {
      id: 'D3',
      selected: false,
      booked: false,
    },
    {
      id: 'D4',
      selected: false,
      booked: false,
    },
    {
      id: 'D5',
      selected: false,
      booked: false,
    },
    {
      id: 'D6',
      selected: false,
      booked: false,
    },
    {
      id: 'D7',
      selected: false,
      booked: false,
    },
    {
      id: 'D8',
      selected: false,
      booked: false,
    },
    {
      id: 'D9',
      selected: false,
      booked: false,
    },
    {
      id: 'D10',
      selected: false,
      booked: false,
    },
    {
      id: 'E1',
      selected: false,
      booked: false,
    },
    {
      id: 'E2',
      selected: false,
      booked: false,
    },
    {
      id: 'E3',
      selected: false,
      booked: false,
    },
    {
      id: 'E4',
      selected: false,
      booked: false,
    },
    {
      id: 'E5',
      selected: false,
      booked: false,
    },
    {
      id: 'E6',
      selected: false,
      booked: false,
    },
    {
      id: 'E7',
      selected: false,
      booked: false,
    },
    {
      id: 'E8',
      selected: false,
      booked: false,
    },
    {
      id: 'E9',
      selected: false,
      booked: false,
    },
    {
      id: 'E10',
      selected: false,
      booked: false,
    },
    {
      id: 'F1',
      selected: false,
      booked: false,
    },
    {
      id: 'F2',
      selected: false,
      booked: false,
    },
    {
      id: 'F3',
      selected: false,
      booked: false,
    },
    {
      id: 'F4',
      selected: false,
      booked: false,
    },
    {
      id: 'F5',
      selected: false,
      booked: false,
    },
    {
      id: 'F6',
      selected: false,
      booked: false,
    },
    {
      id: 'F7',
      selected: false,
      booked: false,
    },
    {
      id: 'F8',
      selected: false,
      booked: false,
    },
    {
      id: 'F9',
      selected: false,
      booked: false,
    },
    {
      id: 'F10',
      selected: false,
      booked: false,
    },
    {
      id: 'G1',
      selected: false,
      booked: false,
    },
    {
      id: 'G2',
      selected: false,
      booked: false,
    },
    {
      id: 'G3',
      selected: false,
      booked: false,
    },
    {
      id: 'G4',
      selected: false,
      booked: false,
    },
    {
      id: 'G5',
      selected: false,
      booked: false,
    },
    {
      id: 'G6',
      selected: false,
      booked: false,
    },
    {
      id: 'G7',
      selected: false,
      booked: false,
    },
    {
      id: 'G8',
      selected: false,
      booked: false,
    },
    {
      id: 'G9',
      selected: false,
      booked: false,
    },
    {
      id: 'G10',
      selected: false,
      booked: false,
    },
    {
      id: 'H1',
      selected: false,
      booked: false,
    },
    {
      id: 'H2',
      selected: false,
      booked: false,
    },
    {
      id: 'H3',
      selected: false,
      booked: false,
    },
    {
      id: 'H4',
      selected: false,
      booked: false,
    },
    {
      id: 'H5',
      selected: false,
      booked: false,
    },
    {
      id: 'H6',
      selected: false,
      booked: false,
    },
    {
      id: 'H7',
      selected: false,
      booked: false,
    },
    {
      id: 'H8',
      selected: false,
      booked: false,
    },
    {
      id: 'H9',
      selected: false,
      booked: false,
    },
    {
      id: 'H10',
      selected: false,
      booked: false,
    },
    {
      id: 'I1',
      selected: false,
      booked: false,
    },
    {
      id: 'I2',
      selected: false,
      booked: false,
    },
    {
      id: 'I3',
      selected: false,
      booked: false,
    },
    {
      id: 'I4',
      selected: false,
      booked: false,
    },
    {
      id: 'I5',
      selected: false,
      booked: false,
    },
    {
      id: 'I6',
      selected: false,
      booked: false,
    },
    {
      id: 'I7',
      selected: false,
      booked: false,
    },
    {
      id: 'I8',
      selected: false,
      booked: false,
    },
    {
      id: 'I9',
      selected: false,
      booked: false,
    },
    {
      id: 'I10',
      selected: false,
      booked: false,
    },
    {
      id: 'J1',
      selected: false,
      booked: false,
    },
    {
      id: 'J2',
      selected: false,
      booked: false,
    },
    {
      id: 'J3',
      selected: false,
      booked: false,
    },
    {
      id: 'J4',
      selected: false,
      booked: false,
    },
    {
      id: 'J5',
      selected: false,
      booked: false,
    },
    {
      id: 'J6',
      selected: false,
      booked: false,
    },
    {
      id: 'J7',
      selected: false,
      booked: false,
    },
    {
      id: 'J8',
      selected: false,
      booked: false,
    },
    {
      id: 'J9',
      selected: false,
      booked: false,
    },
    {
      id: 'J10',
      selected: false,
      booked: false,
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventBookingForm: EventBookingForm
  ) {}

  async ionViewWillEnter(): Promise<void> {
    const paramId = this.route.snapshot.params.id;
    this.route.queryParams.subscribe((params) => {
      if (params.slot) {
        const slot = params.slot;
        this.eventBookingForm.selectedSlot = slot;
        this.eventBookingForm.selectedEvent = paramId;
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('/tabs/events');
  }

  selectTicket(): void {
    this.eventBookingForm.selectedSeats = this.allSelectedSeats();
    this.router.navigateByUrl('/tabs/events/select-tickets');
  }

  selectSeat(e: any, s: any) {
    const value = e.target.value;
    const checked = e.target.checked;
    this.seats = this.seats.map((s) => {
      if (s.id === value) {
        return { ...s, selected: checked };
      } else {
        return { ...s };
      }
    });
  }

  selectedSeats(): boolean {
    const found = this.seats.filter((s) => s.selected);
    return found && found.length ? true : false;
  }

  allSelectedSeats(): any[] {
    const found = this.seats
      .filter((s) => s.selected)
      .map((s) => {
        return s.id;
      });
    return found && found.length ? found : undefined;
  }

  allSelectedSeatsLength(): number {
    const found = this.seats
      .filter((s) => s.selected)
      .map((s) => {
        return s.id;
      });
    return found && found.length ? found.length : 0;
  }
}
