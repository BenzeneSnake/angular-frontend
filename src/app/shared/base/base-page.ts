import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-app-base-page',
  template: '',
  styles: [],
})
export abstract class BasePageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.onDestroy();
  }

  onDestroy(): void {}

  ngOnInit(): void {
    this.onInit();
  }

  showInputBlockError(submitted: boolean, submitForm: FormGroup, ctrlName: string): boolean {
    const ctrl = submitForm.get(ctrlName);
    return submitted && ctrl?.errors?.errMsg;
  }

  abstract onInit(): void;
}
