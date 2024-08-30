"use client";

import React, { useState, createContext, useContext } from "react";
import { loginSubmit } from "./function";
import { LoginDisplayProps, UserContextType, UserDataType } from "./types";
import { useForm } from "react-hook-form";
import { LoginUserContext } from "./userContext";
import { useRouter } from 'next/navigation';

// ユーザコンテキストを作成

const LoginDisplay = () => {
  // ログインしているユーザ情報:
  const { setLoginUser } = useContext(LoginUserContext) as UserContextType;
  const [authError,setAuthError]=useState('')
  // ログイン成功後IncompleteTodoへ
  const router=useRouter()


  //useFormで使うもの
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataType>({ mode: "onBlur" });

  return (
    <div className="loginForm">
      <form
        onSubmit={handleSubmit((loginData: UserDataType) =>
          loginSubmit(loginData, setLoginUser,setAuthError,router)
        )}
        >
        <h1 className="TODO">Login Form</h1>
        <h1 className="authError-h1">{authError}</h1>
        <div className="formContent">
          <label className="loginLabel" htmlFor="名前">
            ユーザ名
          </label>
          <input
            placeholder="ユーザ名を入力してください"
            type="text"
            {...register("user", { required: "ユーザ名を入力してください" })}
          />
          <p className="loginFormError">{errors.user?.message as React.ReactNode}</p>
          <label className="loginLabel" htmlFor="名前">
            パスワード
          </label>
          <input
            placeholder="パスワードを入力してください"
            type="password"
            {...register("password", {
              required: "パスワードを入力してください",
            })}
          />
          <p className="loginFormError">{errors.password?.message as React.ReactNode}</p>
        </div>
        <div className="loginFrom-button">
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
};

export default LoginDisplay;
