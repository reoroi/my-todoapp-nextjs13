'use client'
import Link from "next/link";
import TodoList from "./components/TodoList";
import { useGetTodoList } from "./GetTodoData";



function App() {
  //firebaseのデータを取得
  const todoList = useGetTodoList()
  
  return (
    <div>
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
        <TodoList todoList={todoList}/>
      </div>
    </div>
  );
}

export default App;
