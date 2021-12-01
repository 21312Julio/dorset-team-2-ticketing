import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { StorageService } from '../storage.service';

const STORAGE_KEY_PREFIX = 'cineplex';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  token: string;
  token$: ReplaySubject<string> = new ReplaySubject<string>(1);

  constructor(private storage: StorageService) {
    this.init();
  }

  async init() {
    let token: string;
    token = await this._getToken();
    this.token = token;
    this.token$.next(token);
  }

  private async _getToken(): Promise<string> {
    return this.storage.get(`${STORAGE_KEY_PREFIX}`);
  }

  async setToken(token: string) {
    let key = `${STORAGE_KEY_PREFIX}`;

    if (token == null) {
      this.token = null;
      await this.storage.remove(key);
    } else {
      this.token = token;
      await this.storage.set(key, token);
    }
    this.token$.next(token);
  }
}
