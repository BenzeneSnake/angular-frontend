import { HttpClient } from '@angular/common/http';
import { TodoItem, TodoStatusType } from './../shared/model/todo-list.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  //styleUrls: ['./base.css','./index.css','./todo-list.component.css'],
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{


  title = "Todo List";
  toggleAllBtn=false;
  nowTodoStatusType=TodoStatusType.All;
  TodoStatusType=TodoStatusType


  //todolist資料
  todoList:TodoItem[] = [
    {
      Status:true,
      Thing:"第一件事",
      Editing:false
    },{
      Status:false,
      Thing:"第二件事",
      Editing:false
    },{
      Status:false,
      Thing:"第三件事",
      Editing:false
    }
  ];

  todoListAPI:TodoItem[]=[];

  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.http.get<TodoItem[]>('../assets/todoListData.json').subscribe(data=>{this.todoListAPI=data;});
  }

  //全選
  toggleAll(){
    this.toggleAllBtn=!this.toggleAllBtn;
    this.todoList.forEach(data => {
      data.Status = this.toggleAllBtn;
    });

  }

  //打勾
  clickCheck(item:TodoItem){
    item.Status=!item.Status;
    if(this.todoCompletedList.length===this.todoList.length){
      this.toggleAllBtn=true;
    }else{
      this.toggleAllBtn=false;
    }
  }

  //刪除
  clickDelete(item:TodoItem){
    //this.todoList.splice(index,1)
    this.todoList=this.todoList.filter(data => data!=item);
  }

  //新增項目
  addItem(newTodoValue:string){

      if(newTodoValue.trim()!==""){
        this.todoList.push({
          Status:false,
          Thing: newTodoValue,
          Editing:false
        });
      }

  }

  //開啟編輯模式
  itemOpenEditModel(item:TodoItem){
    item.Editing=true;
  }

  //更改項目資料
  updateValue(item:TodoItem, value:string){
    item.Thing=value;
    item.Editing=false;
  }

  //設定顯示狀態
  setTodoStatusType(type:number){
    this.nowTodoStatusType=type;

  }

  //抓取顯示項目
  get nowTodoList():TodoItem[]{
    let list:TodoItem[]=[];
    switch(this.nowTodoStatusType){
      case TodoStatusType.Active:
        list = this.todoActiveList;
        break;
      case TodoStatusType.Completed:
        list = this.todoCompletedList;
        break;
      default:
        list = this.todoList;
    }
    return list;
  }

  //未完成項目
  get todoActiveList():TodoItem[] {
    let list=this.todoList.filter(data => !data.Status);
    return list;
  }

  //完成項目
  get todoCompletedList():TodoItem[]{
    let list=this.todoList.filter(data => data.Status);
    return list;
  }

  //清除已完成項目
  cleanCompletedItem(){
    this.todoList=this.todoActiveList;
  }
}
