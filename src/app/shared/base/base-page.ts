import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'app-base-page',
  template: '',
  styles: [],
})
export abstract class BasePageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.onDestroy();
  }

  onDestroy(): void { }

  ngOnInit(): void {
    this.onInit();
  }

  abstract onInit(): void;

}
