import React from "react";
import "../../globals.css";

const AddTodo = () => {
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
              <p className="addtodo-p">日付</p>
              <input
                // onChange={(e) => setTitle(e.target.value)}
                className="addTodo-input"
                type="date"
              />
            </div>
          </div>

          <button
            type="submit"
            // className={`py-2 px-4 border rounded-md ${loading ? ' bg-orange-300 cursor-not-allowed rounded-full' : 'bg-orange-500 hover:bg-orange-500' }` }
            // disabled={loading}
          >
            追加
          </button>
        </form>{" "}
      </div>
    </div>
  );
};

export default AddTodo;
