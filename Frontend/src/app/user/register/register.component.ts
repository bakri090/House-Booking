import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Iuser } from '../../model/iuser';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone:false
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: Iuser;
  isSubmitted;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    // this.registerForm = new FormGroup(
    //   {
    //     userName: new FormControl('', Validators.required),
    //     email: new FormControl('', [Validators.required, Validators.email]),
    //     password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    //     confirmPassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
    //     mobile: new FormControl('', [
    //       Validators.required,
    //       Validators.maxLength(10),
    //     ]),
    //   },
    //   this.PasswordMatchValidator,
    // );
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
  // getters for form controls
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

  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      this.toastr.success('Registration successful!', 'Success');
      this.userService.addUser(this.UserData());
      console.log(this.registerForm.value);
      this.registerForm.reset();
      this.isSubmitted = false;
      localStorage.setItem('token',this.user.userName);
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
