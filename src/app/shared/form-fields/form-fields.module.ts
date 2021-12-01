import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormFieldError } from "./form-field-error.component";
import { FormFieldFormControlDirective, FormFieldComponent } from "./form-field.component";
import { FormGroupComponent } from "./form-group.component";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    FormFieldFormControlDirective,
    FormFieldComponent,
    FormGroupComponent,
    FormFieldError,
  ],
  exports: [FormFieldFormControlDirective, FormFieldComponent, FormGroupComponent, FormFieldError],
})
export class FormFieldsModule {}
