import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <article>
    <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Exterior photo of {{housingLocation?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section  class="listing-apply">

      <h2 class="section-reading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApllication()">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" formControlName="firstName">
        
        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" formControlName="lastName">
        
        <label for="email">Email</label>
        <input type="email" id="email-name" formControlName="email">

        <button type="submit" class="primary">Aplly now</button>
      </form>

    </section>
  </article>
`,
  styleUrls: ['./details.component.css']

})

export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  // diretiva do modelo
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(){
    // const housingLocationId = Number( this.route.snapshot.params['id']);
    // this.housingLocation = this.housingService.getHousingLoactionById( housingLocationId );

    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10)

    this.housingService.getHousingLoactionById(housingLocationId).then((housingLocation)=>{
      this.housingLocation = housingLocation;
    })
  
  }

  submitApllication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }

}
