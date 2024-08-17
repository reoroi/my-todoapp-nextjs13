'use client'
import Link from 'next/link';
import FlipMove from "react-flip-move";
import { clickCompleteTodo, clickDeleteTodoList, clickEditTodo, clickSaveEdit } from '../function';
import { useGetTodoList } from '../GetTodoData';

const TodoList = () => {

  const todoList = useGetTodoList()

  return (
    <ul>
      <FlipMove>
        {todoList
          .filter((todo) => todo.status === "Incomplete")
          .map((todoItem, index) => {
            return (
              <li key={todoItem.id}>
                <div className="list-row">
                  <p className="p-index">{index + 1}</p>
                  <p>：</p>
                  <p className="todo-item">{todoItem.todo}</p>
                  <button
                    className="todoList-btn"
                    onClick={() => clickCompleteTodo(todoItem.id)}
                  >
                    完了
                  </button>
                  <Link href={`/DetailTodo/${todoItem.id}`}>
                    <button className="todoList-btn">
                      詳細
                    </button>
                  </Link>
                  <p className="dueDateP">
                    期限{todoItem.deadLineDate}
                  </p>
                </div>
              </li>
              )})}
      </FlipMove>
    </ul>
  )
}

export default TodoList
