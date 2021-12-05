import {
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Host,
  HostBinding,
  Input,
  Optional,
  QueryList,
  SkipSelf,
} from "@angular/core";
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Subscription } from "rxjs";

@Directive({
  selector: "[formControl], [formControlName], [control]",
})
export class FormFieldFormControlDirective {
  @Input("control") control: AbstractControl;
  @Input("formControl") formControl: FormControl;
  @Input("formControlName") formControlName: string;

  constructor(public el: ElementRef) {}
}

@Component({
  selector: "form-field",
  template: `
    <ng-content *ngIf="_formControls.length"></ng-content>
    <form-field-error
      *ngFor="let formControl of _formControls"
      [control]="formControl"
    ></form-field-error>
  `,
  styles: [":host { display: flex; flex-direction: column; }"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormFieldComponent,
      multi: true,
    },
  ],
})
export class FormFieldComponent {
  @HostBinding("class.invalid") invalid: boolean = false;
  @ContentChildren(FormFieldFormControlDirective, { descendants: true })
  formControlDirectives: QueryList<FormFieldFormControlDirective>;
  _formControls: FormControl[] = [];

  subscription: Subscription;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  ngAfterViewInit() {
    // We somehow need setTimeout to solve ExpressionChangedAfterItHasBeenCheckedError.
    setTimeout(() => {
      if (this.formControlDirectives.length) {
        this.formControlDirectives.forEach((fcd) => {
          let formControl = this.getFormControl(fcd);
          let el = fcd.el;
          this._formControls = this._formControls.concat([formControl]);
          this.subscribeStatusChange(formControl, el);
        });
      } else {
        throw "<form-field> is improperly configured.";
        return;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getFormControl(fcd: FormFieldFormControlDirective) {
    return (
      (fcd.control as FormControl) ||
      fcd.formControl ||
      (this.controlContainer.control.get(fcd.formControlName) as FormControl)
    );
  }

  subscribeStatusChange(formControl: FormControl, el: ElementRef) {
    if (!this.subscription) this.subscription = new Subscription();
    this.subscription.add(
      formControl.statusChanges.subscribe((status) => {
        if (status == "INVALID" && formControl.touched) {
          this.invalid = true;
          el.nativeElement.classList.add("invalid");
        } else {
          this.invalid = false;
          el.nativeElement.classList.remove("invalid");
        }
      })
    );
  }
}
