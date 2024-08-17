'use client'
import { collection, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import FlipMove from "react-flip-move";
import db from '../firebase';
import { clickCompleteTodo, clickDeleteTodoList, clickEditTodo, clickSaveEdit } from '../function';
import { useGetTodoList } from '../Tododata';

const TodoList = () => {
  const [editingId, setEditingId] = useState<string | null>(null); //
  const [editTodo, setEditTodo] = useState<string>(""); //編集後TODO
  const [editDate, setEditDate] = useState<string>(""); //編集後Date

const todoList=useGetTodoList()

  return (
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
                    <Link href={`/DetailTodo/${todoItem.id}`}>
                    <button className="todoList-btn">
                      詳細
                    </button>
                    </Link>
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
)
}

export default TodoList
