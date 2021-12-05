import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import flatpickr from 'flatpickr';

@Component({
  selector: 'date-picker-modal',
  templateUrl: 'date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerModal {
  @ViewChild('dateInput') dateInput: ElementRef;

  @Input() selectedDate: Date;
  @Input() enableDates: string[] = [];
  @Input() onlyFuture: boolean = false;
  @Input() onlyPast: boolean = false;

  flatpickrInstance: any;
  flatpickrOptions: any = {
    inline: true,
    disableMobile: true,
    monthSelectorType: 'static',
    onChange: this.onChange.bind(this),
  };

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    let options = { ...this.flatpickrOptions };
    if (this.selectedDate) {
      options.defaultDate = this.selectedDate;
    }
    if (this.enableDates.length) options.enable = this.enableDates;

    if (this.onlyFuture) options.minDate = 'today';
    else if (this.onlyPast) options.maxDate = 'today';

    this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, options);
  }

  onChange(val: Date[]) {
    this.selectedDate = val[0];
  }

  confirm() {
    this.modalCtrl.dismiss(this.selectedDate, 'confirm');
  }

  reset() {
    this.selectedDate = undefined;
    this.confirm();
  }
}
