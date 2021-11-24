import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ModalComponentModule } from "../modal-component/modal-component.module";
import { DatePickerModal } from "./date-picker-modal.component";

@NgModule({
  declarations: [DatePickerModal],
  exports: [DatePickerModal],
  imports: [CommonModule, IonicModule, ModalComponentModule],
})
export class DatePickerModalModule {}
