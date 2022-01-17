import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm);
  }
}
