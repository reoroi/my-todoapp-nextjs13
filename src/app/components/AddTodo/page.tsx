"use client";

import React, { ChangeEvent, useState } from "react";
import "../../globals.css";
import Link from "next/link";
import { handleClientScriptLoad } from "next/script";
import { handleSubmit } from "@/app/function";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [additionalTodo, setAdditionalTodo] = useState<string>(""); //追加TODO
  const [additionalDate, setAdditionalDate] = useState<string>(""); //追加Date
  const [additionalTodoDetail, setAdditionalTodoDetail] = useState<string>("");
  const router=useRouter()
  // 追加ボタン
  const onSubmit=async(e:React.FormEvent)=>{
    
    e.preventDefault()
    
    //useRouterでTodo追加後ホームへ戻る
    //function.tsxにて追加処理を実行
    try{
      await handleSubmit(
        e,
        additionalTodo,
        additionalDate,
        additionalTodoDetail,
        setAdditionalDate,
        setAdditionalTodo,
        setAdditionalTodoDetail,
        router,
      )
      //ホームへ戻る
      
    }catch(error){
      console.error('エラーが発生しました',error)
    }
  }
  return (
    <div>
      <h1 className="TODO">AddTodo</h1>
      <div className="addTodo-content">
        <form
          className="addTodo-form"
          onSubmit={onSubmit}
        >
          <div className="content-lastchild">
            <div className="addTodo-content">
              <p className="addTodo-p">TodoTitle</p>
              <input
                className="addTodo-input"
                placeholder="TodoTitleを入力してください"
                value={additionalTodo}
                onChange={(e:ChangeEvent<HTMLInputElement>) => setAdditionalTodo(e.target.value)}
                type="text"
              />
            </div>
            <div className="addTodo-content">
              <p className="addTodo-p">TODO詳細内容</p>
              <textarea
                className="addTodo-input"
                placeholder="Todoの詳細内容を入力してください"
                onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setAdditionalTodoDetail(e.target.value)}
                rows={5}
                value={additionalTodoDetail}
              />
            </div>
            <div className="addTodo-content">
              <p className="addTodo-p">期限日付</p>
              <input
                onChange={(e) => setAdditionalDate(e.target.value)}
                className="addTodo-input"
                type="date"
                value={additionalDate}
              />
            </div>
          </div>
          <div className="addTodo-Horizontal">
            <button type="submit">追加</button>
            <Link href={"/"}>
              <button>戻る</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
