"use client";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
// import db from "./firebase";
// import {
//   collection,
//   addDoc,
//   doc,
//   deleteDoc,
//   updateDoc,
//   onSnapshot,
// } from "firebase/firestore";
import FlipMove from "react-flip-move";
import { v4 as uuidv4 } from 'uuid';
import db from "./firebase";


type TodoItem = {
  id: string;
  todo: string;
  deadLineDate: string;
  status: string;
};

function App() {
  const [todoListTest,setTodoListTest]=useState([
    {id:uuidv4(),todo:'test1',deadlineDate:'2024-09-09' }
  ])

  const [additionalTodo, setAdditionalTodo] = useState<string>(""); //追加TODO
  const [additionalDate, setAdditionalDate] = useState<string>(""); //追加Date
  const [editingId, setEditingId] = useState<string | null>(null); //
  const [editTodo, setEditTodo] = useState<string>(""); //編集後TODO
  const [editDate, setEditDate] = useState<string>(""); //編集後Date
  const [isTodoSwitch, setIsTodoSwitch] = useState<boolean>(true); //画面切り替え
const [todoList,setTodoList]=useState<TodoItem[]>([])

useEffect(() => {
  const todoData = collection(db, "posts");
  onSnapshot(todoData, (querySnapshot) => {
    const todoData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        todo: data.todo,
        deadLineDate: data.deadLineDate,
        status: data.status,
      } as TodoItem;
    });
    setTodoList(todoData);
  });
}, []);

  

  //firebaseからデータを取得
  // useEffect(() => {
  //   const todoData = collection(db, "TODO");
  //   onSnapshot(todoData, (querySnapshot) => {
  //     const todoData = querySnapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       console.log(db)
  //       return {
  //         id: doc.id,
  //         todo: data.todo,
  //         deadlineDate: data.deadlineDate,
  //         status: data.status,
  //       } as TodoItem;
  //     });
  //     setTodoList(todoData);
  //   });
  // }, []);

  // 追加ボタン
  const clickAdd = () => {
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
      // addDoc(collection(db, "TODO"), {
      //   todo: additionalTodo,
      //   deadlineDate: additionalDate,
      //   status: "Incomplete",
      // });
      setAdditionalDate("");
      setAdditionalTodo("");
    } else {
      alert(alertMessage);
    }
  };

  //完了ボタン
  const clickCompleteTodo = (targetTodoId: string) => {
    // const washingtonRef = doc(db, "TODO", targetTodoId);
    // updateDoc(washingtonRef, {
    //   status: "Complete",
    // });
  };

  // 未着手ボタン
  const clickIncompleteTodo = (targetTodoId: string) => {
    // const washingtonRef = doc(db, "TODO", targetTodoId);
    // updateDoc(washingtonRef, {
    //   status: "Incomplete",
    // });
  };

  //TODO削除ボタン
  const clickDeleteTodoList = (targetTodo: string) => {
    // deleteDoc(doc(db, "TODO", targetTodo));
  };

  //編集ボタン
  const clickEditTodo = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditTodo(todo.todo);
    setEditDate(todo.deadLineDate);
  };

  //編集保存ボタン
  const clickSaveEdit = () => {
    // todoList.forEach((todo) => {
    //   if (todo.id === editingId) {
    //     const washingtonRef = doc(db, "TODO", todo.id);
    //     updateDoc(washingtonRef, {
    //       todo: editTodo,
    //       deadlineDate: editDate,
    //     });
    //   }
    // });
    setEditTodo("");
    setEditingId(null);
  };
  return (
    <>
      <h1 className="TODO">TODO</h1>
      <div className="action-button">
        <Link href={"/components/CompleteTodo"}>
          <button>完了一覧</button>
        </Link>
        <Link href={"/components/AddTodo"}>
          <button>追加</button>
        </Link>
      </div>
      <div className="incomplete-area">
        <ul>
          <FlipMove>
            {todoList
              .filter((todo) => todo.status === "Incomplete")
              .map((todoItem, index) => {
                return (
                  <li key={todoItem.id}>
                    <div className="list-row">
                      {editingId === todoItem.id ? (
                        <>
                          <input
                            onChange={(e) => setEditTodo(e.target.value)}
                            value={editTodo}
                            className="editTodoInput"
                          />
                          <input
                            onChange={(e) => setEditDate(e.target.value)}
                            value={editDate}
                            type="date"
                          />
                          <button className="todoList-btn" onClick={clickSaveEdit}>保存</button>
                        </>
                      ) : (
                        <>
                          <p className="p-index">{index + 1}</p>
                          <p>：</p>
                          <p className="todo-item">{todoItem.todo}</p>
                          <button 
                          className="todoList-btn"
                            onClick={() => clickCompleteTodo(todoItem.id)}
                          >
                            完了
                          </button>
                          <button
                          className="todoList-btn"
                            onClick={() => clickDeleteTodoList(todoItem.id)}
                          >
                            削除
                          </button>
                          <button className="todoList-btn" onClick={() => clickEditTodo(todoItem)}>
                            編集
                          </button>
                          <p className="dueDateP">
                            期限{todoItem.deadLineDate}
                          </p>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
          </FlipMove>
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO一覧</p>
        <ul>
          <FlipMove>
            {todoList
              .filter((todo) => todo.status === "Complete")
              .map((todoItem, index) => {
                return (
                  <li key={todoItem.id}>
                    <div className="list-row">
                      <p className="p-index">{index + 1}</p>
                      <p>：</p>
                      <p className="todo-item">{todoItem.todo}</p>
                      <button onClick={() => clickIncompleteTodo(todoItem.id)}>
                        未着手
                      </button>
                      <button onClick={() => clickDeleteTodoList(todoItem.id)}>
                        削除
                      </button>
                      <p className="dueDateP">期限{todoItem.deadLineDate}</p>
                    </div>
                  </li>
                );
              })}
          </FlipMove>
        </ul>
      </div>
    </>
  );
}

export default App;
