import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  authService = inject(AuthServiceService);
  loadingService = inject(LoadingService);
  fb = inject(FormBuilder);
  router = inject(Router);
  http = inject(HttpClient); // Inject HttpClient
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.required])],
      password: ['', Validators.required],
    });
  }

  login(): void {
    console.log(this.loginForm.value);
    // Uncomment and complete the login logic as needed
    this.loadingService.show();
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        this.loadingService.hide();
        alert('Login Success!!');
        console.log("toekn",res.toekn)
        localStorage.setItem('token', res.token);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['dashboard']);
        this.loginForm.reset();
      },
      error: (error) => {
        console.log('login error', error);
      }
    });
  }
}
