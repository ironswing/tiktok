import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AnHttpGuard implements HttpInterceptor  {
  constructor(private injector: Injector) {
  }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cs = localStorage.getItem('csxfToken');
        const jwtReq = req.clone({
            headers: req.headers.set('X-CSRF-TOKEN', cs)
        });

        let url = req.url;

        if (url.indexOf('login') === -1 && url.indexOf('register') === -1) {
            if (url.indexOf('?') === -1) {
                url = url + "?PHPSESSID=" + localStorage.getItem('session_id');
            } else {
                url = url + "&PHPSESSID=" + localStorage.getItem('session_id');
            }
        }


        const newReq = req.clone({
            url: url
            // headers: ''
        });
        // console.log(newReq);
        return next.handle(newReq);
    }
}
