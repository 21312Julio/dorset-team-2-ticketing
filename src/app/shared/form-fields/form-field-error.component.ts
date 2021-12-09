import { Component, Host, Input, Optional, SkipSelf } from "@angular/core";
import {
  AbstractControl,
  ControlContainer,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

@Component({
  selector: "form-field-error",
  template: `
    <div class="error-message" *ngIf="control.touched && control.errors">
      <div *ngFor="let errorMsg of getErrorMessages()">
        {{ errorMsg }}
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormFieldError,
      multi: true,
    },
  ],
})
export class FormFieldError {
  @Input() control: AbstractControl;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  ngOnInit() {
    if (!this.control && this.controlContainer) {
      this.control = this.controlContainer.control;
    }
  }

  formatError(errorKey, data) {
    if (errorKey.indexOf("may not be null") >= 0)
      return "This field is required";
    if (errorKey.indexOf(" ") >= 0) return errorKey; // If errorKey is a string with at least a space.
    switch (errorKey) {
      case "required":
        return "This field is required";
      case "minlength":
        return `At least ${data.requiredLength} characters required`;
      case "maxlength":
        return `Maximum of ${data.requiredLength} characters required`;
      case "min":
        return `Minimum is ${data.min}`;
      case "max":
        return `Maximum is ${data.max}`;
      case "email":
        return "Please enter a valid email";
      default:
        return "This field is invalid";
    }
  }

  getErrorMessages() {
    let controlErrors = this.control.errors;
    let errorMsgs = [];
    for (let key in controlErrors) {
      let val = controlErrors[key];
      errorMsgs.push(this.formatError(key, val));
    }
    return errorMsgs;
  }
}
