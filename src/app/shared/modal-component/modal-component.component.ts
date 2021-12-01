import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "modal-component",
  templateUrl: "./modal-component.component.html",
  styleUrls: ["./modal-component.component.scss"],
})
export class ModalComponent {
  @Input() modalTitle: string;
  @Input() closeData: any;
  @Input() message: string;
  @Input() successMsg: string;

  @Input() messageImg: string;
  @Input() imgHeight: string = "100";
  @Input() isCartConfirm: boolean = false;
  @Input() closeButton: boolean = true;

  constructor(
    private modalController: ModalController,
  ) {}

  close() {
    this.modalController.dismiss(this.closeData);
  }
}
