import React from 'react'
import { TodoItemType } from '../types'
import FlipMove from "react-flip-move";
import Link from 'next/link';
import { clickIncompleteTodo } from '../function';

//完了TodoListの表示
const CompleteTodoList = ({completeTodo}:{completeTodo:TodoItemType[]}) => {
  return (
    <ul>
      <FlipMove>
        {completeTodo
          .filter((todo) => todo.status === "Complete")
          .map((todoItem, index) => {
            return (
              <li className='todoCompleteList' key={todoItem.id}>
                <div className="list-row">
                  <p className="p-index">{index + 1}</p>
                  <p>：</p>
                  <p className="todo-item">{todoItem.todo}</p>
                  <button
                    className="todoList-btn"
                    onClick={()=>clickIncompleteTodo(todoItem.id)}                  >
                    戻す
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
            )
          })}
      </FlipMove>
    </ul>
  )
}

export default CompleteTodoList