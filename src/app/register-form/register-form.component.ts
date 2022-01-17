import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterFormValidator } from '../shared/ReactiveFormValidator/RegisterFormValidator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  profileForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.profileForm.get(['recommender']).valueChanges.subscribe(() => {
      console.log(this.profileForm.get(['recommender']));
    });
  }

  buildForm() {
    this.profileForm = this.fb.group({
      register: this.fb.group({
        account: ['', RegisterFormValidator.register.accountValidator],
        password: ['', RegisterFormValidator.register.passwordValidator]
      }),
      recommender: this.fb.group(
        {
          recommenderDepartment: [''],
          recommenderId: ['']
        },
        { validators: [RegisterFormValidator.recommender.crossValidator] }
      )
    });
  }

  onSubmit() {}
}
