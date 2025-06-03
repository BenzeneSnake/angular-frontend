import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItem, TodoStatusType } from './../shared/model/todo-list.model';

@Component({
  selector: 'lib-form-practice',
  templateUrl: './form-practice.component.html',
  styleUrls: ['./form-practice.component.css']
})
export class FormPracticeComponent implements OnInit {
  title = 'Todo List';

  toggleAllBtn = false;
  nowTodoStatusType = TodoStatusType.ALL;
  TodoStatusType = TodoStatusType;

  //todolist資料
  todoList: TodoItem[] = [
    {
      Completed: true,
      Thing: '第一件事',
      Editing: false
    },
    {
      Completed: false,
      Thing: '第二件事',
      Editing: false
    },
    {
      Completed: false,
      Thing: '第三件事',
      Editing: false
    }
  ];

  formValue = '';
  todoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      todos: this.fb.array([]),
      newTodo: ['', Validators.required]
    });

    for (const item of this.todoList) {
      //this.addItem(item.Thing, item.Completed);
      const todoItem = this.fb.group({
        Thing: [item.Thing],
        Completed: [item.Completed],
        Editing: false
      });
      this.todos.push(todoItem);
    }

    console.log('ngOnInit');
  }

  //get目前todoList
  get todos(): FormArray {
    return this.todoForm.get('todos') as FormArray;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  //全選
  toggleAll(): void {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todos.controls.forEach((item) => item.patchValue({ Completed: this.toggleAllBtn }));
  }

  //打勾
  clickCheck(index: number): void {
    const item = this.todos.at(index);
    item.patchValue({ Completed: !item.value.Completed });
  }

  //刪除
  clickDelete(index: number): void {
    console.log('我做了刪除動作');
    console.log('刪除 index', index);
    this.todos.removeAt(index);
  }

  //新增一個項目
  addNewItem(): void {
    const newTodoValue = this.todoForm.get('newTodo')?.value;
    console.log(this.todos.value);
    if (newTodoValue.trim()) {
      setTimeout(() => {
        this.todos.push(
          this.fb.group({
            Thing: [newTodoValue],
            Completed: [false],
            Editing: [false]
          })
        );

        console.log(this.todos.value);
        this.todoForm.get('newTodo')?.reset();
      });
    }
  }

  //開啟編輯模式
  itemOpenEditModel(index: number): void {
    const item = this.todos.at(index);
    item.patchValue({ Editing: true });
  }

  //更改項目資料
  updateValue(index: number, value: string): void {
    const item = this.todos.at(index);
    item.patchValue({ Thing: value });
    item.patchValue({ Editing: false });
  }

  //設定顯示狀態
  setTodoStatusType(type: TodoStatusType): void {
    this.nowTodoStatusType = type;
  }

  // //設定顯示狀態
  getTodoItemDisplay(index: number): boolean {
    const item = this.todos.at(index);
    switch (this.nowTodoStatusType) {
      case TodoStatusType.ALL:
        return true;
      case TodoStatusType.ACTIVE:
        return !item.value.Completed;
      case TodoStatusType.COMPELETED:
        return item.value.Completed;
      default:
        return true;
    }
  }

  //未完成數量
  get uncompletedCount(): number {
    return this.todos.controls.filter((ctrl) => !ctrl.value.Completed).length;
  }

  //清除已完成項目
  cleanCompletedItem(): void {
    this.todos.controls.forEach((item, i) => {
      if (item.value.Completed === true) {
        this.todos.removeAt(i);
      }
    });
  }
}
