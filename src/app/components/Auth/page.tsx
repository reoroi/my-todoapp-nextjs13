"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registrationButton } from "@/app/function";

// https://www.youtube.com/watch?v=f1fysEKNwQA&t=697s を参考
const AddNewUser = () => {
  const [authError, setAuthError] = useState("");
  // ログイン成功後IncompleteTodoへ
  const router = useRouter();

  //useFormで使うもの
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ mode: "onBlur" });


  return (
    <div className="loginFormContent">
      <Link href={"/"}>
        <button>戻る</button>
      </Link>
      <div className="formContent">
        <form onSubmit={handleSubmit((loginData)=>registrationButton(loginData,setAuthError,router))} className="formContent">
          <h1 className="TODO">ユーザ追加</h1>
          <h1 className="authError-h1">{authError}</h1>
          <label className="loginLabel" htmlFor="メールアドレス">
            名前
          </label>
          <input
            placeholder="名前を入力してください"
            type="name"
            {...register("name", { required: "名前は必須です。" })} //エラーメッセージ
          />
          <p className="loginFormError">{errors.name?.message as React.ReactNode}</p>
          <label className="loginLabel" htmlFor="メールアドレス">
            メールアドレス
          </label>
          <input
            placeholder="メールアドレスを入力してください"
            type="email"
            {...register("email", { required: "メールアドレスは必須です" })} //エラーメッセージ
          />
          <p className="loginFormError">{errors.email?.message as React.ReactNode}</p>
          <label className="loginLabel" htmlFor="名前">
            パスワード
          </label>
          <input
            placeholder="パスワードを入力してください"
            type="password"
            {...register("password", { required: "パスワードが入力されていません" })} //エラーメッセージ
          />
          <p className="loginFormError">{errors.password?.message as React.ReactNode}</p>
          <button className="registration-button" type="submit">
            登録
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
