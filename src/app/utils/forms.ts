import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from "@angular/forms";

export interface ServerValidationMessage {
  [key: string]:
    | string
    | string[]
    | string[][]
    | ServerValidationMessage
    | ServerValidationMessage[];
  non_field_errors?: string | string[];
}

export function validateAllFields(form: FormGroup | FormArray) {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup || control instanceof FormArray) {
      validateAllFields(control);
    }
  });
}

function setControlErrors(control: AbstractControl, error: string | string[]) {
  let validationErrors: ValidationErrors = {};
  if (Array.isArray(error)) {
    error.forEach((msg) => (validationErrors[msg] = true));
  } else {
    validationErrors[error] = true;
  }
  control.setErrors(validationErrors);
}

export function setFormErrors(
  form: FormGroup | FormArray,
  validationMessage:
    | ServerValidationMessage
    | ServerValidationMessage[]
    | string[][]
) {
  // Recursively loop until string[] or string, then call setControlErrors.
  for (let field in validationMessage) {
    let message = validationMessage[field];
    if (field == "non_field_errors") {
      setControlErrors(form, message);
    } else {
      let control = form.get(field);
      if (control) {
        if (typeof message === "string") {
          // CASE: string
          setControlErrors(control, message);
        } else if (
          !Array.isArray(message) &&
          typeof message === "object" &&
          message !== null
        ) {
          // CASE: ServerValidationMessage
          setFormErrors(control as FormGroup, message);
        } else if (Array.isArray(message) && message.length > 0) {
          // CASE: string[], string[][], ServerValidationMessage[]
          let firstItem = message[0];
          if (typeof firstItem === "string") {
            // CASE: string[]
            setControlErrors(control, message);
          } else {
            // CASE: string[][] or ServerValidationMessage[]
            setFormErrors(control as FormArray, message);
          }
        }
      }
    }
  }
}

export function controlsValid(form: FormGroup, controls: string[]) {
  for (let control of controls) {
    if (!form.get(control).valid) {
      return false;
    }
  }
  return true;
}

export function convertBase64(file: File): Promise<string | ArrayBuffer> {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export interface BadRequestFormErrors {
  [key: string]: string[];
}
