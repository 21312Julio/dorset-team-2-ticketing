import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter, take, timeout } from 'rxjs/operators';
import { TokenStorageService } from '../token-auth/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string;
  user$: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.tokenStorage.token$.subscribe(async (token) => {
      if (token) {
        await this.initUser(token);
      } else {
        this.user$.next(undefined);
        if (this.token) {
          this.token = undefined;
          // Previously logged in so re-route
          if (this.router.url != '/auth/login') {
            await this.router.navigateByUrl('/auth/login');
          }
        }
      }
    });
  }

  async initUser(token: string) {
    try {
      if (this.token != token) {
        let user = await this._getCurrentUser();
        this.token = token;
        this.user$.next(user);
      }
    } catch (e) {
      this.user$.next(undefined);
    }
  }

  async login(email: string, password: string) {
    let data: any = { email, password };
    this.tokenStorage.setToken(null); // When someone tries to login we should reset the token.
    let key = '123213-123213-2132131-12312';
    console.log(key);
    await this.tokenStorage.setToken(key);
    try {
      await this.user$
        .pipe(
          timeout(10000),
          filter((u) => u != undefined),
          take(1)
        )
        .toPromise();
    } catch (e) {
      await this.tokenStorage.setToken(null);
      throw e;
    }
  }

  async logout() {
    await this.tokenStorage.setToken(null);
    this.user$.next(undefined);
    this.token = null;
  }

  private async _getCurrentUser(): Promise<any> {
    let user = { email: 'test@demo.com', name: 'Mubasher' };
    return user;
  }

  async getCurrentUser(): Promise<any> {
    return this.user$.pipe(take(1)).toPromise();
  }
}
