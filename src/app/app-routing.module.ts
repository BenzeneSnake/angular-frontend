import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { FormPracticeComponent } from './form-practice/form-practice.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'entry', pathMatch: 'full' },
  { path: 'entry', component: EntryComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'form', component: FormPracticeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
