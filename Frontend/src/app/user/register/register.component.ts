import { Auth } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IuserForRegister } from '../../model/iuser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone:false
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user: IuserForRegister = {} as IuserForRegister;
  isSubmitted: boolean = false;
  constructor(
    private auth: Auth,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.CreateRegisterationForm();
  }
  CreateRegisterationForm() {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(6)],
        ],
        mobile: ['', [Validators.required, Validators.maxLength(10)]],
      },
      { validators: this.PasswordMatchValidator },
    );
  }

  PasswordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordNotMatch: true };
    }
  }
  // #region getters for form controls
  get userName() {
    return this.registerForm.get('userName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get mobile() {
    return this.registerForm.get('mobile');
  }
  // #endregion
  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {

      this.auth.RegisterForm(this.UserData()).subscribe({
        next: (val) => {
          console.log(this.registerForm.value);
          this.toastr.success('Registration successful!', 'Success');
        // this.registerForm.reset();
        this.isSubmitted = false;
        }
      })

    }else{
      this.toastr.error('Please fill out the form correctly.', 'Error');
    }
  }
  UserData() {
    return (this.user = {
      userName: this.userName?.value,
      email: this.email?.value,
      password: this.password?.value,
      mobile: this.mobile?.value,
    });
  }
}
