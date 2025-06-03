import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BasePageComponent } from '../shared/base/base-page';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'lib-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent extends BasePageComponent implements AfterViewInit {
  constructor() {
    super();
  }

  ngAfterViewInit() {}

  async onInit(): Promise<void> {}
}
