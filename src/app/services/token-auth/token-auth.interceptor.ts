import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: "root",
})
export class TokenAuthInterceptor implements HttpInterceptor {
  // TODO: Replace this interceptor with api.module.ts Configuration Factory.

  constructor(
    private tokenStorage: TokenStorageService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.tokenStorage.token;
    if (req.url.startsWith(environment.baseUrl)) {
      if (token) {
        req = req.clone({
          headers: req.headers.set("Authorization", `Token ${token}`),
        });
      }
      return next.handle(req).pipe(
        catchError(async (error: HttpErrorResponse) => {
          if (error.status == 401) {
            if (token) {
              await this.tokenStorage.setToken(null);
            }
          }
          throw error;
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
