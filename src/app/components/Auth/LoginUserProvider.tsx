'use client'
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";


// グローバルに参照できる現在のユーザを宣言
export const currentUserContext=createContext<string|null>('Unknown')


//現在firebaseにどのユーザでログインしているか常時監視する
export const LoginUserProvider = ({children}:{children: React.ReactNode}) => {
  const router = useRouter();
  const [currentUser,setCurrentUser]=useState<string|null>('')

//どのユーザの名前でログインしているか
  useEffect(() => {
    const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.displayName||'Unknown')
      }else{
        // ログインしていない場合ログイン画面へ
        router.push('/')
      }
    });
    //クリーンアップ関数を実行
    return ()=>unsubscribe()
  },[]);
  
  return (
    <>
    {/* 現在のユーザをグローバルに宣言しLoginStateConfirmation配下のログイン状態を監視 */}
    <currentUserContext.Provider value={currentUser}>
        {children}
    </currentUserContext.Provider>
    </>
  );

};

export default LoginUserProvider;
