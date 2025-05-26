import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/shared/base/base-page';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent extends BasePageComponent {
  isOpen = false;
  constructor() { super(); }

  async onInit(): Promise<void> {

  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

}
