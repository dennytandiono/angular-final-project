import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentServiceService } from 'src/app/shared/payment-service.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
  providers: [DatePipe]
})
export class AddPaymentComponent implements OnInit {

  month: number = 0;
  year: number = 0;

  constructor(
    public paymentService : PaymentServiceService,
    public router : Router,
    public datePipe:DatePipe
    ) { }

    addPaymentForm = new FormGroup({
      cardOwnerName: new FormControl('',[Validators.required]),
      cardNumber: new FormControl('',[Validators.required,Validators.minLength(7)]),
      securityCode: new FormControl('',[Validators.required,Validators.minLength(6)]),
      expirationDate: new FormControl('',[Validators.required])
    })

  ngOnInit(): void {
  }

  get cardOwnerName(){
    return this.addPaymentForm.get('cardOwnerName')
  }
  get cardNumber(){
    return this.addPaymentForm.get('cardNumber')
  }
  get securityCode(){
    return this.addPaymentForm.get('securityCode')
  }
  get expirationDate(){
    return this.addPaymentForm.get('expirationDate')
  }

  addPayment(){
    this.validateDate();
    this.paymentService.addPayment(this.addPaymentForm.value).subscribe((res)=>{
      alert('Insert Data Berhasil');
      if(res.result){
      }
      this.addPaymentForm.reset()
      this.router.navigate(['/paymentDetails'])
    })
  }

  validateDate() {
    let dateForm = this.expirationDate?.value;
    let splitDate = dateForm.split('/');

    this.month = parseInt(splitDate[0]);
    this.year = parseInt(splitDate[1]);

    let convertDate = this.datePipe.transform(new Date(2000 + this.year, this.month - 1, 1), 'YYYY-MM-dd');

    this.addPaymentForm.get('expirationDate')?.setValue(convertDate);
  }
}
