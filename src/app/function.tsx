import { addDoc, collection } from "firebase/firestore";
import { TodoItem } from "./types";
import db from "./firebase";

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

// AddTodoページでの追加ボタン関数
export const handleSubmit = async (
  e: React.FormEvent,
  additionalTodo: string,
  additionalDate: string,
  additionalTodoDetail: string,
  setAdditionalDate: React.Dispatch<React.SetStateAction<string>>,
  setAdditionalTodoDetail: React.Dispatch<React.SetStateAction<string>>,
  setAdditionalTodo: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();

  let isFormatCheck: boolean = true;
  let alertMessage: string = "";
  if (additionalTodo === "") {
    alertMessage += "TODOを入力してください\n";
    isFormatCheck = false;
  }
  if (additionalDate === "") {
    alertMessage += "期限を入力してください";
    isFormatCheck = false;
  }
  if (isFormatCheck) {
    await addDoc(collection(db, "posts"), {
      todo: additionalTodo,
      deadLineDate: additionalDate,
      todoDetail: additionalTodoDetail,
      status: "Incomplete",
    });
    setAdditionalDate("");
    setAdditionalTodo("");
    setAdditionalTodoDetail("");
  
  } else {
    alert(alertMessage);
  }

};
