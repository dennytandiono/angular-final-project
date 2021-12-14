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

  pageid: number = -1;
  selectedPayment: Payment = { id: -1, cardOwnerName: '', cardNumber: '', expirationDate: new Date(), securityCode: '' };

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
    this.getSelectedPayment()
  }

  updatePaymentForm = new FormGroup({
    id: new FormControl(this.activateRoute.snapshot.params.id),
    cardOwnerName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required]),
    securityCode: new FormControl('', [Validators.required]),
    expirationDate: new FormControl('', [Validators.required]),
  })

  get id() {
    return this.updatePaymentForm.get('id')
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
    if (this.updatePaymentForm.valid) {
      this.validateDate();
      this.paymentService.updatePayment(this.updatePaymentForm.value, this.pageid).subscribe((res) => {
        if (res.result) {
        }
        this.updatePaymentForm.reset()
        this.router.navigate(['/paymentDetails'])
      })
    }
  }

  getSelectedPayment() {
    this.paymentService.getPaymentById(this.pageid).subscribe((res) => {
      this.selectedPayment = res.payment;
      let convertDate = this.datePipe.transform(this.selectedPayment.expirationDate, 'MM/yy');

      this.updatePaymentForm.get('cardOwnerName')?.setValue(this.selectedPayment.cardOwnerName);
      this.updatePaymentForm.get('cardNumber')?.setValue(this.selectedPayment.cardNumber);
      this.updatePaymentForm.get('securityCode')?.setValue(this.selectedPayment.securityCode);
      this.updatePaymentForm.get('expirationDate')?.setValue(convertDate);
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
