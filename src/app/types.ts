export type TodoItemType = {
  id: string;
  todo: string;
  deadLineDate: string;
  status: string;
  todoDetail:string;
};

export type UserDataType={
  user:string,
  password:string,
}

export type UserContextType = {
  loginUser: string;
  setLoginUser: React.Dispatch<React.SetStateAction<string>>;
};


export type LoginDisplayProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}