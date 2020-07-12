import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private _authService: AuthenticationService,
    private _notificationService: NzNotificationService,
    private _router: Router
  ) {}

  loginForm: FormGroup;

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    this._authService.login(this.loginForm.value).subscribe(
      (resp) => {
        this._router.navigate(['task']);
      },
      (err) => {
        this._notificationService.error('Lo sentimos', err.error['message']);
      }
    );
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['deyxonh04@gmail.com', [Validators.required]],
      password: ['mafalu04', [Validators.required]],
    });
  }
}
