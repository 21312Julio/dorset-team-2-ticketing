import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class StorageService extends Storage {
  ready: Promise<Storage>;
  _storage: Storage;

  constructor() {
    super();
    this.ready = this.create().then((s) => (this._storage = s));
  }

  async get(key: string): Promise<any> {
    if (!this._storage) await this.ready;
    return super.get(key);
  }

  async set(key: string, value: any): Promise<any> {
    if (!this._storage) await this.ready;
    return super.set(key, value);
  }

  async remove(key: string): Promise<any> {
    if (!this._storage) await this.ready;
    return super.remove(key);
  }

  async clear(): Promise<void> {
    if (!this._storage) await this.ready;
    return super.clear();
  }

  async length(): Promise<number> {
    if (!this._storage) await this.ready;
    return super.length();
  }

  async keys(): Promise<string[]> {
    if (!this._storage) await this.ready;
    return super.keys();
  }

  async forEach(
    iteratorCallback: (value: any, key: string, iterationNumber: Number) => any
  ): Promise<void> {
    if (!this._storage) await this.ready;
    return super.forEach(iteratorCallback);
  }
}
