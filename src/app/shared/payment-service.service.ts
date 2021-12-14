import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  endpoint: string ='https://finalproject-docker.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public authService:AuthService,private http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    let msg = '';

    if(error.error instanceof ErrorEvent){
      msg = error.error.message;
    } else {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(msg);
  }

  getPayments (): Observable<any> {
    return (
      this.http
      .get(`${this.endpoint}/api/payment`)
      .pipe( catchError(this.handleError) )
    )
  }

  updatePayment(payment: Payment,id:number): Observable<any> {
    console.log(payment)
    return (
      this.http
      .put(`${this.endpoint}/api/payment/${id}`, payment)
      .pipe( catchError(this.handleError) )
    )
  }

  addPayment(payment:Payment): Observable<any>{
    console.log(payment)
    let api=`${this.endpoint}/api/payment`;
    return this.http
                .post(api, payment)
                .pipe( catchError(this.handleError))
  }

  deletePayment(id: number): Observable<any> {
    return (
      this.http
      .delete(`${this.endpoint}/api/payment/${id}`)
      .pipe( catchError(this.handleError) )
    )
  }

  getPaymentById (id:number): Observable<any> {
    return (
      this.http
      .get(`${this.endpoint}/api/payment/${id}`)
      .pipe( catchError(this.handleError) )
    )
  }
}
