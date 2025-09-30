import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { LoginComponent } from './entry/login/login.component';
import { WelcomeComponent } from './entry/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'entry', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'entry', component: EntryComponent },
  { path: 'welcome', component: WelcomeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
