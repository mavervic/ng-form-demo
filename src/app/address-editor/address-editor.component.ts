import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-address-editor',
  templateUrl: './address-editor.component.html',
  styleUrls: ['./address-editor.component.css']
})
export class AddressEditorComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  profileForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.syncAddress();
  }

  buildForm() {
    this.profileForm = this.fb.group({
      homeRegistAddr: this.fb.group({
        street: [''],
        city: [''],
        state: ['']
      }),
      homeAddr: this.fb.group({
        sameHomeRegistAddr: [false],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required]
      })
    });
  }

  syncAddress() {
    const homeRegistAddr$ = this.profileForm.get([
      'homeRegistAddr'
    ])?.valueChanges;
    const sameHomeRegistAddr$ = this.profileForm.get([
      'homeAddr',
      'sameHomeRegistAddr'
    ])?.valueChanges;

    const distinctFlag$ = sameHomeRegistAddr$.pipe(distinctUntilChanged());

    combineLatest([distinctFlag$, homeRegistAddr$])
      .pipe(filter((value) => value[0] === true))
      .subscribe((value) => {
        this.profileForm.get(['homeAddr']).setValue({
          sameHomeRegistAddr: true,
          ...value[1]
        });
      });
  }

  printFormInfo() {
    console.log(this.profileForm);
    console.log(this.profileForm.controls);
    console.log(this.profileForm.controls.homeRegistAddr);

    let homeRegistAddr = this.profileForm.controls.homeRegistAddr as FormGroup;
    console.log(homeRegistAddr.controls);
    console.log(homeRegistAddr.controls.street);
    console.log(homeRegistAddr.controls.street.errors);

    let street = this.profileForm.controls['homeRegistAddr'].value.street;
    console.log(this.profileForm.get(['homeRegistAddr', 'street'])?.errors);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm);
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  addRepresentacio() {}

  syncHomeRegistAddr() {}
}
