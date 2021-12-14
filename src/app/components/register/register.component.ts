import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  registerForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required, Validators.email])
  })

  get username(){
    return this.registerForm.get('username');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }


  ngOnInit(): void {
  }

  registerUser(){
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if(res.success){
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }
    });
  }

}
