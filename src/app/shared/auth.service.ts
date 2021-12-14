import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string ='https://finalproject-docker.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<any>{
    let api = `${this.endpoint}/api/AuthManagement/Register`;
    return this.http.post(api, user).pipe(catchError(this.handleError))
  }

  login(user: User){
    return this.http.post<any>(`${this.endpoint}/api/AuthManagement/Login`, user).pipe(catchError(this.handleError))
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['/paymentDetails']);
        console.log(res.token)
      });
  }

  handleError (err: HttpErrorResponse) {
    console.log(err)
    if(err.status < 500)
      return throwError(err.error.errors)
    else
      return throwError(`Server-side error code: ${err.status}\nMessage: ${err.message}`)
  }

  get isLoggedIn(): boolean{
    let authToken = localStorage.getItem('access_token');
    return (authToken) ? true : false;
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

}
