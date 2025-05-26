import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    EntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EntryModule { }
