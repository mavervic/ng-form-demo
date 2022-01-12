import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class ProfileEditorComponent {
  constructor(private fb: FormBuilder) {}

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl(''),
  //   }),
  // });

  /**
   * 陣列中的第一項是其初始值
   * 陣列中的第二項和第三項可以提供同步和非同步驗證器
   */
  profileForm = this.fb.group({
    firstName: ['', Validators.required], // HTML5 驗證器屬性可以和 Angular 響應式表單提供的內建驗證器組合使用。組合使用這兩種驗證器實踐，可以防止在範本檢查完之後表示式再次被修改導致的錯誤。
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }
}
