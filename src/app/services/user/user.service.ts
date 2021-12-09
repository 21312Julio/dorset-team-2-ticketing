import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter, take, timeout } from 'rxjs/operators';
import { TokenStorageService } from '../token-auth/token-storage.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string;
  user$: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private tokenStorage: TokenStorageService,
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
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
    this.tokenStorage.setToken(null); // When someone tries to login we should reset the token.
    const result = await this.ngFireAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    let key = result.user.uid;
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
    this.tokenStorage.token = null;
  }

  private async _getCurrentUser(): Promise<any> {
    if (this.tokenStorage.token) {
      return this.tokenStorage.token;
    } else {
      return false;
    }
  }

  async getCurrentUser(): Promise<any> {
    return this.user$.pipe(take(1)).toPromise();
  }
}
