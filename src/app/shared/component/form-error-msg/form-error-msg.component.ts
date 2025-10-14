import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'lib-form-error-msg',
  templateUrl: './form-error-msg.component.html',
  styleUrls: ['./form-error-msg.component.css'],
})
export class FormErrorMsgComponent implements OnInit {
  @Input() showErr = false;
  @Input() errMsg: string | null = null;
  @Input() formCtrl?: AbstractControl | null;
  @Input() isFull?: boolean | undefined;
  @Input() aftBr?: boolean | undefined;

  get msg(): SafeHtml {
    const errMsg = this.formCtrl?.errors?.errMsg ?? this.errMsg;
    return errMsg ? this.domSanitizer.bypassSecurityTrustHtml('！' + errMsg) : '';
  }

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
