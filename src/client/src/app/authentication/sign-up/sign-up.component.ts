import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { isThisSecond } from 'date-fns';

@Component({
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm: FormGroup;

  submitForm(): void {
    for (const i in this.signUpForm.controls) {
      this.signUpForm.controls[i].markAsDirty();
      this.signUpForm.controls[i].updateValueAndValidity();
    }
    this._auth.register(this.signUpForm.value).subscribe(
      (resp) => {
        this._notificationService.success(
          'Exelente',
          'usuario registrado correctamente'
        );
        this.signUpForm.reset()
      },
      (err) => {
        console.log(err);

        this._notificationService.error('Lo sentimos', err.error['message']);
      }
    );
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.signUpForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  constructor(
    private fb: FormBuilder,
    private _notificationService: NzNotificationService,
    private _auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['Deyxon Miguel', [Validators.required]],
      email: ['swimportacionessas@gmail.com', [Validators.required]],
      password: ['mafalu04', [Validators.required]],
    });
  }
}
