import { TodoItem } from "./types";

export const clickAdd = () => {
  // let isFormatCheck: boolean = true;
  // let alertMessage: string = "";
  // if (additionalTodo === "") {
  //   alertMessage += "TODOを入力してください\n";
  //   isFormatCheck = false;
  // }
  // if (additionalDate === "") {
  //   alertMessage += "期限を入力してください";
  //   isFormatCheck = false;
  // }
  // if (isFormatCheck) {
  //   // addDoc(collection(db, "TODO"), {
  //   //   todo: additionalTodo,
  //   //   deadlineDate: additionalDate,
  //   //   status: "Incomplete",
  //   // });
  //   setAdditionalDate("");
  //   setAdditionalTodo("");
  // } else {
  //   alert(alertMessage);
  // }
};

// 編集ボタン
export const clickEditTodo = (todo: TodoItem) => {
  // setEditingId(todo.id);
  // setEditTodo(todo.todo);
  // setEditDate(todo.deadLineDate);
};

//完了ボタン
export const clickCompleteTodo = (targetTodoId: string) => {
  // const washingtonRef = doc(db, "TODO", targetTodoId);
  // updateDoc(washingtonRef, {
  //   status: "Complete",
  // });
};

//TODO削除ボタン
export const clickDeleteTodoList = (targetTodo: string) => {
  // deleteDoc(doc(db, "TODO", targetTodo));
};

//編集保存ボタン
export const clickSaveEdit = () => {
  // todoList.forEach((todo) => {
  //   if (todo.id === editingId) {
  //     const washingtonRef = doc(db, "TODO", todo.id);
  //     updateDoc(washingtonRef, {
  //       todo: editTodo,
  //       deadlineDate: editDate,
  //     });
  //   }
  // });
  // setEditTodo("");
  // setEditingId(null);
};
