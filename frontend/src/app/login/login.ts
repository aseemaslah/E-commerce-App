import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone:true
})
export class Login implements OnInit {
  loginForm!: FormGroup;

constructor(private forms: FormBuilder){}

ngOnInit(): void{
  this.loginForm = this.forms.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })
}

onLogin(): void{
  if(this.loginForm.valid){
    this
    console.log(this.loginForm.value);
  }
  else{
    console.log("Form is invalid"); 
  }
}
}
