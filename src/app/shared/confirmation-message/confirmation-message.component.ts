import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

export interface ConfirmationMessagesProperties {
  icon: string;
  title: string;
  text1: string;
  text2: string;
  buttonLink: string;
  buttonName: string;
}

@Component({
  selector: 'confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss'],
})
export class ConfirmationMessageComponent implements OnInit {
  @Input() message: ConfirmationMessagesProperties;
  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}

  continue(url: string): void {
    this.modalController.dismiss()
    this.router.navigateByUrl(url);
  }
}
