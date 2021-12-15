import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentServiceService } from 'src/app/shared/payment-service.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  allPayments : Payment [] = []

  constructor(
    private router:Router,
    public actRoute:ActivatedRoute,
    private paymentService : PaymentServiceService
  ) { }

  ngOnInit(): void {
    this.getAllPayment()
  }

  getAllPayment() {
    this.paymentService.getPayments()
    .subscribe(data => {
      this.allPayments = data
      console.log(data)
    })
  }

  confirmDelete(id: number) {
    if(confirm(`Are you sure you want to delete this Payment data?`))
      this.deletePayment(id)
  }

  deletePayment(id:any){
    this.paymentService.deletePayment(id).subscribe(data =>{
      this.allPayments= data
      console.log(data)
      location.reload()
    })
  }

  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
