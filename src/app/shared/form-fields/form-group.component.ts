import { Component, Host, Input, Optional, SkipSelf } from "@angular/core";
import { ControlContainer, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "form-group",
  template: `
    <ng-content></ng-content>
    <form-field-error
      *ngIf="formGroup"
      [control]="formGroup"
    ></form-field-error>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormGroupComponent,
      multi: true,
    },
  ],
})
export class FormGroupComponent {
  @Input() formGroup: FormGroup;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  ngAfterViewInit() {
    if (this.formGroup) {
      return;
    } else if (this.controlContainer) {
      this.formGroup = this.controlContainer.control as FormGroup;
    } else {
      throw "<form-group> is improperly configured.";
      return;
    }
  }
}
