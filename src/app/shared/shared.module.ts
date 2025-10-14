import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormErrorMsgComponent } from './component/form-error-msg/form-error-msg.component';
import { MenuHeaderComponent } from './component/menu-header/menu-header/menu-header.component';

const components = [MenuHeaderComponent];

@NgModule({
  declarations: [...components, FormErrorMsgComponent],
  imports: [CommonModule],
  exports: [...components, FormErrorMsgComponent],
})
export class SharedModule {}
