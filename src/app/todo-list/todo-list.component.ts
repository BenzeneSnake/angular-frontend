import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodoItem, TodoStatusType } from './../shared/model/todo-list.model';

@Component({
  selector: 'lib-todo-list',
  templateUrl: './todo-list.component.html',
  //styleUrls: ['./base.css','./index.css','./todo-list.component.css'],
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
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

  todoListAPI: TodoItem[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<TodoItem[]>('../assets/todoListData.json').subscribe((data) => {
      this.todoListAPI = data;
    });
  }

  //全選
  toggleAll(): void {
    this.toggleAllBtn = !this.toggleAllBtn;
    // this.todoList.forEach(data => {
    //   data.Completed = this.toggleAllBtn;
    // });
    this.todoList.map((data) => (data.Completed = this.toggleAllBtn));
  }

  //打勾
  clickCheck(item: TodoItem): void {
    item.Completed = !item.Completed;
    // if(this.todoCompletedList.length===this.todoList.length){
    //   this.toggleAllBtn=true;
    // }else{
    //   this.toggleAllBtn=false;
    // }
    this.toggleAllBtn = this.todoCompletedList.length === this.todoList.length;
  }

  //刪除
  clickDelete(item: TodoItem): void {
    this.todoList = this.todoList.filter((data) => data !== item);
  }

  //新增項目
  addItem(newTodoValue: string): void {
    if (newTodoValue.trim() !== '') {
      this.todoList.push({
        Completed: false,
        Thing: newTodoValue,
        Editing: false
      });
    }
  }

  //開啟編輯模式
  itemOpenEditModel(item: TodoItem): void {
    item.Editing = true;
  }

  //更改項目資料
  updateValue(item: TodoItem, value: string): void {
    item.Thing = value;
    item.Editing = false;
  }

  //設定顯示狀態
  // setTodoCompletedType(type:number){
  //   this.nowTodoCompletedType=type;

  // }
  setTodoStatusType(type: TodoStatusType): void {
    this.nowTodoStatusType = type;
  }

  //抓取顯示項目
  get nowTodoList(): TodoItem[] {
    switch (this.nowTodoStatusType) {
      case TodoStatusType.ACTIVE:
        return this.todoList.filter((data) => !data.Completed);
      case TodoStatusType.COMPELETED:
        return this.todoCompletedList;
      default:
        return this.todoList;
    }
  }

  nowTodoList2(): TodoItem[] {
    switch (this.nowTodoStatusType) {
      case TodoStatusType.ACTIVE:
        return this.todoList.filter((data) => !data.Completed);
      case TodoStatusType.COMPELETED:
        return this.todoCompletedList;
      default:
        return this.todoList;
    }
  }

  //未完成項目
  get todoActiveList(): TodoItem[] {
    return this.todoList.filter((data) => !data.Completed);
  }

  //完成項目
  get todoCompletedList(): TodoItem[] {
    return this.todoList.filter((data) => data.Completed);
  }

  //清除已完成項目
  cleanCompletedItem(): void {
    this.todoList = this.todoList.filter((data) => !data.Completed);
  }
}
