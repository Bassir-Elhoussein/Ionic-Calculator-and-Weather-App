import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent {

  constructor(private menuController: MenuController) {}

  // Function to open the menu
  openMenu() {
    this.menuController.open('main-menu');
  }
}
