import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { httpInterceptorProviders } from './http-interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { UpdatePaymentComponent } from './components/update-payment/update-payment.component';
import { DeletePaymentComponent } from './components/delete-payment/delete-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PaymentDetailsComponent,
    NavbarComponent,
    AddPaymentComponent,
    UpdatePaymentComponent,
    DeletePaymentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
