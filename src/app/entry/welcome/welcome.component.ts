import { Component } from '@angular/core';
import { BasePageComponent } from 'src/app/shared/base/base-page';

@Component({
  selector: 'lib-app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent extends BasePageComponent {
  username = '';

  async onInit(): Promise<void> {
    // 可以從路由參數或服務中獲取使用者名稱
  }
}