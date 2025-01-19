import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule], 
})
export class CalculatorPage {
  result: string = '';

  onButtonClick(value: string) {
    if (value === 'C') {
      this.result = '';
    } else if (value === '=') {
      try {
        this.result = eval(this.result); // Use caution with eval!
      } catch (e) {
        this.result = 'Error';
      }
    } else {
      this.result += value;
    }
  }
}
