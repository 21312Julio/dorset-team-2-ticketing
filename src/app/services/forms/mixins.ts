import { FormGroup } from "@angular/forms";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { DatasourceConfig } from "src/app/utils/data-manager.factory";

/*
 * Mixins Info: https://blog.bitsrc.io/understanding-mixins-in-typescript-3c2c9a545d87
 * This method is used for extending multiple `abstract` classes.
 */
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      let descriptor = Object.getOwnPropertyDescriptor(
        baseCtor.prototype,
        name
      );
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        <PropertyDescriptor & ThisType<any>>descriptor
      );
    });
  });
}

export abstract class FilterMixin {
  filterCount = 0;

  abstract datasourceConfig: DatasourceConfig;

  filterForm: FormGroup;

  updateFilter(params: { [key: string]: string }) {
    let queryParams = { ...this.datasourceConfig.queryParams, ...params };
    for (let k in queryParams) {
      let value = queryParams[k];
      if (value == undefined || value == "all") delete queryParams[k];
      if (k == "search" && value == "") delete queryParams[k]; // Remove empty search
    }
    this.datasourceConfig = {
      ...this.datasourceConfig,
      queryParams: { ...queryParams },
    };

    delete queryParams.search; // Remove search from filterCount
    this.filterCount = 0;
    for (let formControlKey in queryParams) {
      if (this.filterForm.controls[formControlKey]) {
        this.filterCount++;
      }
    }
  }
}

export abstract class DeleteMixin<T> {
  constructor(
    protected alertCtrl: AlertController,
    protected toastCtrl: ToastController,
    protected loadingCtrl: LoadingController
  ) {}

  protected async onDelete(
    data: T,
    message: string,
    deleteFn: (data: T) => Promise<void>,
    successMessage: string = "Deleted Successfully"
  ): Promise<void> {
    let alertView = await this.alertCtrl.create({
      header: "What would you like to do?",
      message: message,
      buttons: [
        { text: "Cancel", role: "cancel", cssClass: "cancel-btn" },
        { text: "Confirm", role: "confirm", cssClass: "confirm-btn-primary" },
      ],
    });
    await alertView.present();
    let { role } = await alertView.onDidDismiss();
    if (role == "confirm") {
      let loadingView = await this.loadingCtrl.create();
      await loadingView.present();
      try {
        await deleteFn(data);
        await loadingView.dismiss();
        if (successMessage) await this.toastDeleteSucccess(successMessage);
      } catch (e) {
        await loadingView.dismiss();

        if (e.status == 400) {
          this.alertDeleteError(`Unable to delete`);
        } else if (e.status == 403) {
          this.alertDeleteError(e.error.detail);
        } else if (e.status == 404) {
          this.alertDeleteError(
            "Looks like the page you're trying to visit does not exist. Please check the URL and try again.",
            "404 Error"
          );
        } else if (e.status == 500) {
          this.alertDeleteError(
            "Something went wrong, please reach out to the CinePlex support team for details"
          );
        } else if (e.status == 0) {
          this.alertDeleteError(
            "We appreciate your patience and understanding. We are experiencing heavy traffic to our services. Please try again later."
          );
        } else if (e.status == 429) {
          this.alertDeleteError(
            "We are unable to process your request at this time. Please try again later"
          );
        }
        console.log(e);
      }
    }
  }

  protected async alertDeleteError(message: string, headText?: string) {
    let alertView = await this.alertCtrl.create({
      header: headText ? headText : "Delete Error",
      message: message,
      buttons: [
        { text: "Ok", role: "cancel", cssClass: "confirm-btn-primary" },
      ],
    });
    alertView.present();
  }

  protected async toastDeleteSucccess(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }
}

/*
 * Mixins Info: https://blog.bitsrc.io/understanding-mixins-in-typescript-3c2c9a545d87
 * The following 3 lines are required to create a multi-inherited mixin.
 */
export abstract class FilterDeleteMixin<T> {
  // This needs to be a mix of the multiple inherited classes' constructor injection.
  constructor(
    protected alertCtrl: AlertController,
    protected toastCtrl: ToastController,
    protected loadingCtrl: LoadingController
  ) {}
}
export interface FilterDeleteMixin<T> extends FilterMixin, DeleteMixin<T> {}
applyMixins(FilterDeleteMixin, [FilterMixin, DeleteMixin]);
