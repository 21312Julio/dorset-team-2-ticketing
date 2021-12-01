import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-seats',
  templateUrl: './pick-seats.page.html',
  styleUrls: ['./pick-seats.page.scss'],
})
export class PickSeatsPage {
  constructor(private location: Location, private router: Router) {}
  goBack() {
    this.router.navigateByUrl("/tabs/events");
  }
  selectTicket(): void {
    this.router.navigateByUrl('/tabs/events/select-tickets');
  }
}
