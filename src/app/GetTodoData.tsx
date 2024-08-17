'use client'
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase";
import { TodoItemType } from "./types";

export const useGetTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  useEffect(() => {
    const todoData = collection(db, "posts");

    // onSnapshot の返り値として unsubscribe 関数が返される
    const unsubscribe = onSnapshot(todoData, (querySnapshot) => {
      const todos = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          todo: data.todo,
          deadLineDate: data.deadLineDate,
          status: data.status,
        } as TodoItemType;
      });
      setTodoList(todos); // 取得したデータを状態に保存
    });

    // クリーンアップ関数を返す
    return () => unsubscribe(); 
  }, []);
  return todoList
}
