import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faGlobe, faCamera} from '@fortawesome/free-solid-svg-icons';
import {faYoutube, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgFor, NgStyle } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule,ReactiveFormsModule, NgFor, NgStyle],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export  default class LoginComponent implements OnInit{
  faEye = faEye;
  faEyeSlash = faEyeSlash; 
  faGlobe = faGlobe;
  faCamera = faCamera;
  faYoutube = faYoutube;
  faLinkedinIn = faLinkedinIn;
  errorMessage: string = '';
  fb = inject(FormBuilder);
  router = inject(Router)
  authService = inject(AuthService)
   loginForm !: FormGroup
   ngOnInit(): void {
    this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    },
    );
  
  }
  login() {
    if (this.loginForm.valid) {
      this.authService.loginService(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.authService.storeToken(res.token)
          // this.router.navigate(['login']);
        },
        error: (err) => {
          console.log(err);
          if (err.error && err.error.error) {
            this.errorMessage =  err.error.error;
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields with valid information.';
    }
  }
  showErroMessage(){
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: this.errorMessage,
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

}
