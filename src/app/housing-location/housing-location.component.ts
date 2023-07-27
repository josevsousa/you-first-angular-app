import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      housing-location works!
    </p>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  // O ponto de exclamação é chamado de operador de asserção não nulo e informa ao compilador TypeScript que o valor dessa propriedade não será nulo ou indefinido.
  @Input() housingLocation!: HousingLocation;

}
