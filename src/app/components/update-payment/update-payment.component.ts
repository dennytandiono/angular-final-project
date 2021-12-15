import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentServiceService } from 'src/app/shared/payment-service.service';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css'],
  providers: [DatePipe]
})
export class UpdatePaymentComponent implements OnInit {

  pageid: number = 0;
  selectedPayment: Payment = 
  { 
    id: 0, 
    cardOwnerName: '', 
    cardNumber: '', 
    expirationDate: new Date(), 
    securityCode: '' 
  };

  month: number = 0;
  year: number = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    public paymentService: PaymentServiceService,
    public router: Router,
    private datePipe: DatePipe) {
    this.pageid = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getSelectedPayment();
  }

  updatePaymentForm = new FormGroup({
    id: new FormControl(),
    cardOwnerName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required,Validators.minLength(7)]),
    securityCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
    expirationDate: new FormControl('', [Validators.required]),
  })

  get id(){
    return this.updatePaymentForm.get('id');
  }

  get cardOwnerName() {
    return this.updatePaymentForm.get('cardOwnerName')
  }
  get cardNumber() {
    return this.updatePaymentForm.get('cardNumber')
  }
  get securityCode() {
    return this.updatePaymentForm.get('securityCode')
  }
  get expirationDate() {
    return this.updatePaymentForm.get('expirationDate')
  }

  updatePayment() {
    this.validateDate();
    this.paymentService.updatePayment(this.updatePaymentForm.value, this.pageid).subscribe((res) => {
      alert('Update Data Berhasil');
      if (res.result) {
      }
      this.updatePaymentForm.reset()
      this.router.navigate(['/paymentDetails'])
    })
  }

  getSelectedPayment(id:number=this.pageid){
    this.paymentService
    .getPaymentById(id)
    .subscribe(data => {
      console.log(data)
      this.selectedPayment=data
      let convertDate = this.datePipe.transform(this.selectedPayment.expirationDate, 'MM/yy');
      
      this.id?.setValue(data.id)
      this.cardOwnerName?.setValue(data.cardOwnerName)
      this.cardNumber?.setValue(data.cardNumber)
      this.expirationDate?.setValue(convertDate)
      this.securityCode?.setValue(data.securityCode)
    })
  }

  validateDate() {
    let dateForm = this.expirationDate?.value;
    let splitDate = dateForm.split('/');

    this.month = parseInt(splitDate[0]);
    this.year = parseInt(splitDate[1]);

    let convertDate = this.datePipe.transform(new Date(2000 + this.year, this.month - 1, 1), 'YYYY-MM-dd');

    this.updatePaymentForm.get('expirationDate')?.setValue(convertDate);
  }
}
