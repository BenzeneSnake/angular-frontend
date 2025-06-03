import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryModule } from './entry/entry.module';
import { FormPracticeComponent } from './form-practice/form-practice.component';
import { SharedModule } from './shared/shared.module';
import { TodoListComponent } from './todo-list/todo-list.component';
@NgModule({
  declarations: [AppComponent, TodoListComponent, FormPracticeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    EntryModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
