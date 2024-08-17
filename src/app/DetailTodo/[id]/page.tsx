'use client'
import React, { useState } from 'react'
import { useParams, } from "next/navigation";
import Link from 'next/link';
import { useGetTodoList } from '@/app/GetTodoData';
import { TodoItemType } from '@/app/types';
import { clickEditTodo, clickSaveEdit } from '@/app/function';


const DetailTodo = () => {
  const [editTodo, setEditTodo] = useState<string>(""); //編集後TODO
  const [editTodoDetail, setEditTodoDetail] = useState<string>('')//編集後のTodo詳細
  const [editDate, setEditDate] = useState<string>(""); //編集後Date
  const [isEditing, setIsEditing] = useState<boolean>(false)//編集フラグ

  const params = useParams()
  //対象のid(url)を取得
  const id = params.id as string
  //firebaseからすべてのTodoデータ取得
  const todoList: TodoItemType[] = useGetTodoList()
  //idが一致するデータを取得
  const todoDetail = todoList.find((todo) => todo.id === id)


  return (
    <div>
      <button className='detailTodoDelete-btn'>削除</button>
      <h1 className="TODO">{isEditing ? 'EditingTodo' : 'DetailTodo'}</h1>
      <div className="TodoDetail-content">
        {isEditing === true ? (
          <>
            <div className="contentDetailTodo">
              <h1>TodoTitle</h1>
              <input className='editingInput' onChange={(e)=>setEditTodo(e.target.value)} value={editTodo} type="text" />
              <h1>Todoの詳細内容</h1>
              <textarea  className='editingTextarea' onChange={(e)=>setEditTodoDetail(e.target.value)} value={editTodoDetail} ></textarea>
              <h1>期限日付</h1>
              <input className='editingInput' onChange={(e)=>setEditDate(e.target.value)} value={editDate} type="date" />
              <h1>現在のステータス</h1>
              <p>{todoDetail?.status}</p>
            </div>
          </>
        ) : (
          <>
            <div className="contentDetailTodo">
              <h1>TodoTitle</h1>
              <p>{todoDetail?.todo}</p>
              <h1>Todoの詳細内容</h1>
              <textarea >{todoDetail?.todoDetail}</textarea>
              <h1>期限日付</h1>
              <p>{todoDetail?.deadLineDate}</p>
              <h1>現在のステータス</h1>
              <p>{todoDetail?.status}</p>
            </div>
          </>
        )}
        <div className="addTodo-Horizontal">
          {isEditing ? 
          <button onClick={() => clickSaveEdit(id, editTodo, editDate, editTodoDetail,setEditTodo, setEditTodoDetail, setEditDate, setIsEditing)}>保存</button> 
          : <>
              <button onClick={() => clickEditTodo(setEditTodo, setEditTodoDetail, setEditDate, setIsEditing,  isEditing, todoDetail)}>編集</button>
              <Link href={"/"}>
                <button>戻る</button>
              </Link>
            </>
          }
        </div>
      </div>
    </div>

  )
}

export default DetailTodo