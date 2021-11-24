import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { isAfter } from "date-fns";

export function integerValidator(opts?: {
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return function (control: AbstractControl): ValidationErrors {
    if (opts && !opts.required) {
      if (control.value === "" || control.value == undefined) {
        return null;
      }
    }

    let value = parseInt(control.value);
    if (opts && opts.min != null && value - opts.min < 0) {
      let error = {};
      error[`Minimum value is ${opts.min}`] = true;
      return error;
    }
    if (opts && opts.max != null && opts.max - value < 0) {
      let error = {};
      error[`Maximum value is ${opts.max}`] = true;
      return error;
    }

    if (
      parseFloat(control.value) == parseInt(control.value) &&
      !isNaN(control.value)
    ) {
      return null;
    }
    return { "Input must be a number": true };
  };
}

export function positiveIntegerValidator(
  control: AbstractControl
): ValidationErrors {
  if (control.value === "" || control.value == undefined) {
    return null;
  }
  if (parseInt(control.value) > 0) {
    if (
      parseFloat(control.value) == parseInt(control.value) &&
      !isNaN(control.value)
    ) {
      return null;
    }
  }
  return { "Must be a positive integer": true };
}

export function decimalValidator(opts?: {
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return function (control: AbstractControl): ValidationErrors {
    if (opts && !opts.required) {
      if (control.value === "" || control.value == undefined) {
        return null;
      }
    }
    let pattern = /^-?\d+\.?(\d{1,2})?$/;
    let validated = pattern.test(control.value);
    if (!validated && control.dirty) {
      return { "Price must only be in numerical value": true };
    }
    let value = parseFloat(control.value);
    if (opts && opts.min && value - opts.min < -0.000001) {
      let error = {};
      error[`Minimum value is ${opts.min}`] = true;
      return error;
    }
    if (opts && opts.max && opts.max - value < -0.000001) {
      let error = {};
      error[`Maximum value is ${opts.max}`] = true;
      return error;
    }
    return null;
  };
}

export function positiveDecimalValidator(
  control: AbstractControl
): ValidationErrors {
  let pattern = /^\d+\.?(\d{1,2})?$/;
  let validated = pattern.test(control.value);
  if (!validated && control.dirty) {
    return { "Price must only be in positive numerical value": true };
  }
  return null;
}

export function patternValidatorFactory(
  regex: RegExp,
  errorMsg: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    let error = {};
    error[errorMsg] = true;
    return valid ? null : error;
  };
}

export function numericOnly(event): boolean {
  // restrict e, E, -, _, +,  "," and "." characters in  input type number
  const charCode = event.which ? event.which : event.keyCode;
  if (
    charCode == 101 ||
    charCode == 44 ||
    charCode == 46 ||
    charCode == 45 ||
    charCode == 95 ||
    charCode == 43 ||
    charCode == 69
  ) {
    return false;
  }
  return true;
}

export function birthDateValidator(control: AbstractControl): ValidationErrors {
  if (control.value) {
    let today = new Date();
    let dob = new Date(control.value);
    if (isAfter(dob, today)) {
      return { "Date of birth must not be a future date": true };
    }
  }
  return null;
}

export const passwordValidators = [
  Validators.required,
  Validators.minLength(8),
  patternValidatorFactory(/[A-Z]/, "noUpperCase"),
  patternValidatorFactory(/[a-z]/, "noLowerCase"),
  patternValidatorFactory(/[!@#$%^&*(),.?":{}|<>\d]/, "noNumberOrSymbol"),
];

export function passwordMatchValidator(form: FormGroup) {
  if (form.controls.new_password1.dirty && form.controls.new_password2.dirty) {
    if (
      form.controls.new_password1.value == form.controls.new_password2.value ||
      !form.controls.new_password2.value
    ) {
      return null;
    } else {
      return { "Passwords do not match": true };
    }
  }
  return null;
}

export function phoneNumberValidator(opts?: {
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return function (control: AbstractControl): ValidationErrors {
    if (opts && !opts.required) {
      if (control.value === "" || control.value == undefined) {
        return null;
      }
    }

    let pattern = /^[0-9-+]*$/;
    let validated = pattern.test(control.value);
    if (!validated && control.dirty) {
      return { "Only numbers and '-+' characters allowed": true };
    }

    let value = control.value;
    if (opts && opts.min != null && value.length - opts.min < 0) {
      let error = {};
      error[`There must be at least ${opts.min} numbers`] = true;
      return error;
    }

    if (opts && opts.max != null && opts.max - value.length < 0) {
      let error = {};
      error[`The maximum of ${opts.max} numbers allowed`] = true;
      return error;
    }

    return null;
  };
}