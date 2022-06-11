import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

/**
 * Interceptor class that is used for converting string date from backend to date.
 */
export class JsonDateInterceptor implements HttpInterceptor {

  /**
   * Intercept an incoming http request and convert its body
   * @param req the http request intercepted
   * @param next the http handler
   * @returns an observable of http event, most likely a response
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map( (val: HttpEvent<any>) => {
      if (val instanceof HttpResponse){
        const body = val.body;
        this.convert(body);
      }
      return val;
    }));
  }

  /**
   * Check whether the value given is a valid iso date time.
   * @param value the value to check
   * @returns true if the value is a valid iso date time.
   */
  isIsoDateString(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string'){
      return moment(value, moment.ISO_8601, true).isValid();
    }    
    return false;
  }

  /**
   * Convert all the hhtp response body property string that are valid isodate time to date.
   * @param body the http response body
   * @returns the body if null, undefiend or not an object type 
   */
  convert(body: any){
    if (body === null || body === undefined ) {
      return body;
    }
    if (typeof body !== 'object' ){
      return body;
    }
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.isIsoDateString(value)) {
        body[key] = new Date(value);
      } else if (typeof value === 'object') {
        this.convert(value);
      }
    }
  }
}