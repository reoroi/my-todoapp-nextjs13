'use client'
import { useState,createContext } from "react"
import { UserContextType } from "./types"

//グローバルで扱いたいユーザを宣言
export const LoginUserContext = createContext<UserContextType | null>(null);

// グローバルで使用するコンテキストを作成
export const LoginUserProvider = ({children}:{children: React.ReactNode})=>{
  //グローバルで使えるユーザ情報
  const [loginUser,setLoginUser]=useState<string>('')
  
  return (
    //layout.tsxがchildrenに入る
    <LoginUserContext.Provider value={{loginUser,setLoginUser}}>
      {children}
    </LoginUserContext.Provider>

  )

}

