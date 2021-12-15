import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdatePaymentComponent } from './components/update-payment/update-payment.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '',redirectTo:'/login',pathMatch:'full'},
  {path: 'addPayment', component:AddPaymentComponent, canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'paymentDetails',component:PaymentDetailsComponent, canActivate: [AuthGuard]},
  {path:'updatePayment/:id',component:UpdatePaymentComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
