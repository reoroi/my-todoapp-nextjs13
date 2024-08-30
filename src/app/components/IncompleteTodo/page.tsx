'use client'
import Link from 'next/link'
import React from 'react'
import TodoList from '../TodoList'
import { useGetTodoList } from '@/app/GetTodoData'

const IncompleteTodo = () => {

const incompleteTodo =useGetTodoList()
  return (
    <div>
      <Link href={'/'}>
      <button className='logout-btn'>ログアウト</button>
      </Link>
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
        <TodoList incompleteTodo={incompleteTodo} />
      </div>
    </div>
  )
}

export default IncompleteTodo