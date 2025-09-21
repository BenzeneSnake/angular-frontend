import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryModule } from './entry/entry.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    EntryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
