export interface TodoItem {
  Completed: boolean;
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
  ALL,
  ACTIVE,
  COMPELETED
}
