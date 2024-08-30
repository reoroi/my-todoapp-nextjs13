'use client'
import { useGetTodoList } from '@/app/GetTodoData'
import React from 'react'
import CompleteTodoList from '../CompleteTodoList'
import Link from 'next/link'

//完了TODO一覧
const CompleteTodo = () => {
  
  const completeTodo=useGetTodoList()

  return (
    <div>
            <Link href={'/'}>
      <button className='logout-btn'>ログアウト</button>
      </Link>

      <h1 className="TODO">CompleteTodo</h1>
      <div className="action-button">
        <Link href={'/components/IncompleteTodo'}>
          <button>未完了一覧</button>
        </Link>
      </div>
      <div className="incomplete-area">
        <CompleteTodoList completeTodo={completeTodo}/>
      </div>
    </div>
  )
}

export default CompleteTodo
