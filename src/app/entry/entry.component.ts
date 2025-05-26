import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../shared/base/base-page';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent extends BasePageComponent implements AfterViewInit {
  constructor() {
    super();
  }

  ngAfterViewInit() {
  }

  async onInit(): Promise<void> {

  }



}
