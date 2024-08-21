import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { TodoItemType } from "./types";
import db from "./firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

//未完了ボタン
export const clickIncompleteTodo = (targetTodoId: string) => {
  const washingtonRef = doc(db, "posts", targetTodoId);
  updateDoc(washingtonRef, {
    status: "Incomplete",
  });
};


//完了ボタン
export const clickCompleteTodo = (targetTodoId: string) => {
  const washingtonRef = doc(db, "posts", targetTodoId);
  updateDoc(washingtonRef, {
    status: "Complete",
  });
};

//TODO削除ボタン
export const clickDeleteTodoList = async (targetTodo: string,router:AppRouterInstance) => {
  try{
    await deleteDoc(doc(db, "posts", targetTodo));
    router.push('/')
  }catch(error){
    console.log(error,'エラーが発生しました')
  }
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
  setAdditionalTodo: React.Dispatch<React.SetStateAction<string>>,
  router:AppRouterInstance
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
    router.push('/')

  } else {
    alert(alertMessage);
  }

};
