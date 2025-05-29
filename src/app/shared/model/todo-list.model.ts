export interface TodoItem {
  Status: boolean;
  Thing: string;
  Editing: boolean;
}


// class TodoItemClass {
//   Status: boolean;
//   Thing: string;

//   constructor(status: boolean, thing: string) {
//     this.Status = status;
//     this.Thing = thing;
//   }
// }


export enum TodoStatusType {
  All,
  Active,
  Completed
}
