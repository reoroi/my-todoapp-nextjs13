import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { TodoItemType } from "./types";
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
export const clickEditTodo = (
  setEditTodo: React.Dispatch<React.SetStateAction<string>>,
  setEditTodoDetail: React.Dispatch<React.SetStateAction<string>>,
  setEditDate: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  isEditing: boolean, todoDetail: TodoItemType | undefined) => {
  //編集状態のフラグを反転させる
  setIsEditing((prev) => !prev);
  if (!isEditing) {
    //todoDetail.todoがundefinedである場合''を返す
    setEditTodo(todoDetail?.todo || '');
    setEditDate(todoDetail?.deadLineDate || '')
    setEditTodoDetail(todoDetail?.todoDetail || '')
  }

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
export const clickSaveEdit = (id: string, editTodo: string, editDate: string, editTodoDetail: string,
  setEditTodo: React.Dispatch<React.SetStateAction<string>>,
  setEditTodoDetail: React.Dispatch<React.SetStateAction<string>>,
  setEditDate: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const washingtonRef = doc(db, "posts", id);
  updateDoc(washingtonRef, {
    todo: editTodo,
    todoDetail: editTodoDetail,
    deadLineDate: editDate,
  });

  setEditTodo("");
  setEditTodoDetail('')
  setEditDate('')
  setIsEditing(false);
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
