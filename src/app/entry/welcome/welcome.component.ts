import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasePageComponent } from 'src/app/shared/base/base-page';

@Component({
  selector: 'lib-app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent extends BasePageComponent {
  username = '';

  constructor(private router: Router) {
    super();
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.username = navigation.extras.state['username'] || '';
    }
  }

  async onInit(): Promise<void> {}
}