"use client";
import { useGetTodoList } from "@/app/GetTodoData";
import React, { useContext } from "react";
import CompleteTodoList from "../CompleteTodoList";
import Link from "next/link";
import { clickLogout } from "@/app/function";
import { currentUserContext } from "../Auth/LoginUserProvider";

//完了TODO一覧
const CompleteTodo = () => {
  // グローバルで宣言している現在のユーザを宣言
  const currentUser = useContext(currentUserContext);  
  // ユーザごとのTODOリストを取得
  const completeTodo = useGetTodoList(currentUser);
  return (
    <div>
      <button onClick={() => clickLogout()} className="logout-btn">
        ログアウト
      </button>
      <h1 className="TODO">CompleteTodo</h1>
      <div className="action-button">
        <Link href={"/components/IncompleteTodo"}>
          <button>未完了一覧</button>
        </Link>
      </div>
      <div className="incomplete-area">
        <CompleteTodoList completeTodo={completeTodo} />
      </div>
    </div>
  );
};

export default CompleteTodo;
