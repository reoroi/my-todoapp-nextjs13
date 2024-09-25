"use client";

import React, { useState, createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { LoginUserContext } from "../../userContext";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { loginSubmit } from "../../function";
import { UserContextType, UserDataType } from "@/app/types";
import Link from "next/link";

// ユーザコンテキストを作成

const LoginDisplay = () => {
  // ログインしているユーザ情報:
  const [authError, setAuthError] = useState("");
  // ログイン成功後IncompleteTodoへ
  const router = useRouter();

  //useFormで使うもの
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataType>({ mode: "onBlur" });



return (
    <div className="loginFormContent">
      <Link href={"/components/Auth"}>
        <button>ユーザ追加</button>
      </Link>
      <form className="formContent"
        onSubmit={handleSubmit((loginData: UserDataType) =>
          loginSubmit(loginData, setAuthError, router)//ユーザ情報の認証
        )}
      >
          <h1 className="TODO">Login Form</h1>
          <h1 className="authError-h1">{authError}</h1>
          <label className="loginLabel" htmlFor="名前">
            メールアドレス
          </label>
          <input
            placeholder="ユーザ名を入力してください"
            type="email"
            {...register("email", { required: "メールアドレスを入力してください" })}
          />
          <p className="loginFormError">{errors.email?.message as React.ReactNode}</p>
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
          <button className="loginFrom-button" type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default LoginDisplay;
