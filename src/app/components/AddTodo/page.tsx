'use client'

import React, { useState } from "react";
import "../../globals.css";
import Link from "next/link";

const AddTodo = () => {

  const [additionalTodo, setAdditionalTodo] = useState<string>(""); //追加TODO
  const [additionalDate, setAdditionalDate] = useState<string>(""); //追加Date

    // 追加ボタン
  
        {/* <div className="input-area">
            <input
              onChange={(e) => setAdditionalTodo(e.target.value)}
              value={additionalTodo}
              placeholder="TODOを入力してください"
            />
            <div className="input-button">
              <input
                onChange={(e) => setAdditionalDate(e.target.value)}
                type="date"
                value={additionalDate || ""}
              />
              <button onClick={clickAdd} className="add-btn">
                追加
              </button>
            </div>
          </div> */}

  return (
    <div>
      <h1 className="TODO">AddTodo</h1>
      <div className="addTodo-content">
        <form
          className="addTodo-form"
          // onSubmit={handleSubmit}
        >
          <div className="content-lastchild">
            <div className="addTodo-content">
              <p className="addtodo-p">TODO</p>
              <input
                className="addTodo-input"
                placeholder="Todoを入力してください"
                // onChange={(e) => setId(e.target.value)}
                type="text"
              />
            </div>
            <div className="addTodo-content">
              <p className="addtodo-p">期限日付</p>
              <input
                // onChange={(e) => setTitle(e.target.value)}
                className="addTodo-input"
                type="date"
              />
            </div>
          </div>
          <div className="addTodo-Horizontal">
          <button
          className=""
            type="submit"
            // disabled={loading}
          >
            追加
          </button>
          <Link href={'/'}>
          <button>戻る</button>
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
