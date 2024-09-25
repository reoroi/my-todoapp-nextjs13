'use client'
import Link from 'next/link'
import React, { createContext, useContext } from 'react'
import TodoList from '../TodoList'
import { useGetTodoList } from '@/app/GetTodoData'
import { clickLogout } from '@/app/function'
import { currentUserContext } from '../Auth/LoginUserProvider'

const IncompleteTodo = () => {
  // グローバルで宣言している現在のユーザを宣言
  const currentUser:string|null=useContext(currentUserContext)
    // ユーザごとのTODOリストを取得
  const incompleteTodo =useGetTodoList(currentUser)
  return (
    <div>
      <button onClick={()=>clickLogout()} className='logout-btn'>ログアウト</button>
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