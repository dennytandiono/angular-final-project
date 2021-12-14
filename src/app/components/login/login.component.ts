import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService : AuthService) { }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get password(){
    return this.loginForm.get('password');
  }

  get email(){
    return this.loginForm.get('email');
  }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.value);
  }

}
