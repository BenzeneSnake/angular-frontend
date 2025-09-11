import { AfterViewInit, Component } from '@angular/core';
import { BasePageComponent } from '../shared/base/base-page';

@Component({
  selector: 'lib-app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent extends BasePageComponent implements AfterViewInit {
  constructor() {
    super();
  }

  ngAfterViewInit(): void {}

  async onInit(): Promise<void> {}
}
