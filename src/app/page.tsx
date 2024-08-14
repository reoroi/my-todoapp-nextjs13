import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./components/TodoList";



function App() {
  // 未着手ボタン
  const clickIncompleteTodo = (targetTodoId: string) => {
    // const washingtonRef = doc(db, "TODO", targetTodoId);
    // updateDoc(washingtonRef, {
    //   status: "Incomplete",
    // });
  };


  //編集ボタン

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
        <>
        <TodoList />
        </>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO一覧</p>
        {/* <ul>
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
                      <button onClick={() => clickDeleteTodoList(todoItem.id)}>
                        削除
                      </button>
                      <p className="dueDateP">期限{todoItem.deadLineDate}</p>
                    </div>
                  </li>
                );
              })}
          </FlipMove>
        </ul> */}
      </div>
    </div>
  );
}

export default App;
