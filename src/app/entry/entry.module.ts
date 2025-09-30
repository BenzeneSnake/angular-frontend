import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EntryComponent } from './entry.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [EntryComponent, LoginComponent, WelcomeComponent],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, SharedModule],
})
export class EntryModule {}
