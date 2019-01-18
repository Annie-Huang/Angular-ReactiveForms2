import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';

import {debounceTime} from 'rxjs/operators';

import { Customer } from './customer';

// function ratingRange(c: AbstractControl): {[key: string]: boolean} | null {
//   if(c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//     return{ 'range': true};   // Linked to <span *ngIf="customerForm.get('rating').errors?.range">
//   }
//   return null;
// }

// This is like a factory function that return the validator function. Beucase validator function can only take (c: AbstractControl) as input parameter.
function ratingRange(min: number, max: number): ValidatorFn {
  // function ratingRange(c: AbstractControl): {[key: string]: boolean} | null {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    // if(c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {   // This looks like a closure to me.
      return {'range': true};   // Linked to <span *ngIf="customerForm.get('rating').errors?.range">
    }
    return null;  // null means no error.
  }
}

function emailMatcher (c:AbstractControl): {[key: string]: boolean} | null {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');

  if (emailControl.pristine  || confirmControl.pristine) {
    return null;
  }

  if(emailControl.value === confirmControl.value) {
    return null;
  }

  return { 'match': true};
  /* This add the error into the formGroup, not the individual formControl. Because emailMatcher is set against the Group in
        emailGroup: this.fb.group({
          ...
        }, { validator: emailMatcher}),
   */
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: string;

  get addresses(): FormArray{
    return <FormArray>this.customerForm.get('addresses');
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Set up form model. This is DIFFERENT FROM data modal.

    // this.customerForm = new FormGroup({
    //   firstName : new FormControl(),
    //   lastName : new FormControl(),
    //   email : new FormControl(),
    //   sendCatalog : new FormControl(true)
    // });
/*    this.customerForm = this.fb.group({
      firstName : '',
      lastName : '',
      email : '',
      sendCatalog : true
    });*/
    // this.customerForm = this.fb.group({
    //   firstName : '',
    //   lastName : {value: 'n/a', disabled: true},
    //   email : '',
    //   sendCatalog : true
    // });
/*
    this.customerForm = this.fb.group({
      firstName : ['', [Validators.required, Validators.minLength(3)]],
      lastName : ['', [Validators.required, Validators.maxLength(50)]],
      email : ['', [Validators.required, Validators.email]],
      sendCatalog : true
    });
*/
    // this.customerForm = this.fb.group({
    //   firstName : ['', [Validators.required, Validators.minLength(3)]],
    //   lastName : ['', [Validators.required, Validators.maxLength(50)]],
    //   email : ['', [Validators.required, Validators.email]],
    //   phone: '',
    //   notification: 'email',
    //   sendCatalog : true
    // });
/*
    this.customerForm = this.fb.group({
      firstName : ['', [Validators.required, Validators.minLength(3)]],
      lastName : ['', [Validators.required, Validators.maxLength(50)]],
      email : ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      rating: [null, [Validators.min(1), Validators.max(5)]],     // set it for null because '' is not good for number
      sendCatalog : true
    });
*/
    // this.customerForm = this.fb.group({
    //   firstName : ['', [Validators.required, Validators.minLength(3)]],
    //   lastName : ['', [Validators.required, Validators.maxLength(50)]],
    //   email : ['', [Validators.required, Validators.email]],
    //   phone: '',
    //   notification: 'email',
    //   rating: [null, ratingRange],     // set it for null because '' is not good for number
    //   sendCatalog : true
    // });
/*
    this.customerForm = this.fb.group({
      firstName : ['', [Validators.required, Validators.minLength(3)]],
      lastName : ['', [Validators.required, Validators.maxLength(50)]],
      email : ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1,5)],     // set it for null because '' is not good for number
      sendCatalog : true
    });
*/
    // this.customerForm = this.fb.group({
    //   firstName : ['', [Validators.required, Validators.minLength(3)]],
    //   lastName : ['', [Validators.required, Validators.maxLength(50)]],
    //   emailGroup: this.fb.group({
    //     email : ['', [Validators.required, Validators.email]],
    //     confirmEmail : ['', [Validators.required]]
    //   }, { validator: emailMatcher}),
    //   phone: '',
    //   notification: 'email',
    //   rating: [null, ratingRange(1,5)],     // set it for null because '' is not good for number
    //   sendCatalog : true
    // });
/*    this.customerForm = this.fb.group({
      firstName : ['', [Validators.required, Validators.minLength(3)]],
      lastName : ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email : ['', [Validators.required, Validators.email]],
        confirmEmail : ['', [Validators.required]]
      }, { validator: emailMatcher}),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1,5)],     // set it for null because '' is not good for number
      sendCatalog : true,
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });*/
    // this.customerForm = this.fb.group({
    //   firstName : ['', [Validators.required, Validators.minLength(3)]],
    //   lastName : ['', [Validators.required, Validators.maxLength(50)]],
    //   emailGroup: this.fb.group({
    //     email : ['', [Validators.required, Validators.email]],
    //     confirmEmail : ['', [Validators.required]]
    //   }, { validator: emailMatcher}),
    //   phone: '',
    //   notification: 'email',
    //   rating: [null, ratingRange(1,5)],     // set it for null because '' is not good for number
    //   sendCatalog : true,
    //   addresses: this.fb.group({
    //     addressType: 'home',
    //     street1: '',
    //     street2: '',
    //     city: '',
    //     state: '',
    //     zip: ''
    //   })
    // });
/*    this.customerForm = this.fb.group({
      firstName : ['', [Validators.required, Validators.minLength(3)]],
      lastName : ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email : ['', [Validators.required, Validators.email]],
        confirmEmail : ['', [Validators.required]]
      }, { validator: emailMatcher}),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1,5)],     // set it for null because '' is not good for number
      sendCatalog : true,
      addresses: this.buildAddress()
    });*/
    this.customerForm = this.fb.group({
      firstName : ['', [Validators.required, Validators.minLength(3)]],
      lastName : ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email : ['', [Validators.required, Validators.email]],
        confirmEmail : ['', [Validators.required]]
      }, { validator: emailMatcher}),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1,5)],     // set it for null because '' is not good for number
      sendCatalog : true,
      addresses: this.fb.array([ this.buildAddress() ])
    });

    // Need to be after definition of customerForm
    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    // emailControl.valueChanges.subscribe(
    //   value => this.setMessage(emailControl)
    // )
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    )
  }

  // This will only check [Validators.required, Validators.email] because c is linked to 'emailGroup.email'
  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if((c.touched || c.dirty) && c.errors) {
      // When it got errors, the FormControl: {
      // ...
      // errors: {email: true} or errors: {required: true}
      // }
      this.emailMessage = Object.keys(c.errors).map(
        key => this.emailMessage += this.validationMessages[key]
      ).join(' ');
    }
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    })
  }

  populateTestData(): void {
    // // Set for all values in the form
    // this.customerForm.setValue({
    //   firstName : 'Jack',
    //   lastName : 'Harkness',
    //   email : 'jack@torchwood.com',
    //   sendCatalog : false
    // });

    // Change value for a subset of the formcontrol.
    this.customerForm.patchValue({
      firstName : 'Jack',
      lastName : 'Harkness',
      sendCatalog : false
    });
  }

  // save(customerForm: NgForm) {
  //   console.log(customerForm.form);
  //   console.log('Saved: ' + JSON.stringify(customerForm.value));
  // }
  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  // Update the validation to set phoneControl is required if user choose to be notify via sms msg
  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
