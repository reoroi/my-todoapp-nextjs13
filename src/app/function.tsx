import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { registrationUserTypes, TodoItemType, UserDataType } from "./types";
import { auth, db } from "./firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UserData } from "./UserData";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

// 編集ボタン
export const clickEditTodo = (
  setEditTodo: React.Dispatch<React.SetStateAction<string>>,
  setEditTodoDetail: React.Dispatch<React.SetStateAction<string>>,
  setEditDate: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  isEditing: boolean,
  todoDetail: TodoItemType | undefined
) => {
  //編集状態のフラグを反転させる
  setIsEditing((prev) => !prev);
  if (!isEditing) {
    //todoDetail.todoがundefinedである場合''を返す
    setEditTodo(todoDetail?.todo || "");
    setEditDate(todoDetail?.deadLineDate || "");
    setEditTodoDetail(todoDetail?.todoDetail || "");
  }
};

//未完了ボタン
export const clickIncompleteTodo = (targetTodoId: string) => {
  const currentUser = auth.currentUser?.displayName;
  if (currentUser) {
    const washingtonRef = doc(db, currentUser, targetTodoId);
    updateDoc(washingtonRef, {
      status: "Incomplete",
    });
  }
};

//完了ボタン
export const clickCompleteTodo = (targetTodoId: string) => {
  const currentUser = auth.currentUser?.displayName;
  if (currentUser) {
    const washingtonRef = doc(db, currentUser, targetTodoId);
    updateDoc(washingtonRef, {
      status: "Complete",
    });
  }
};

//TODO削除ボタン
export const clickDeleteTodoList = async (targetTodo: string, router: AppRouterInstance) => {
  const currentUser = auth.currentUser?.displayName;
  if (currentUser) {
    try {
      await deleteDoc(doc(db, currentUser, targetTodo));
      router.push("/components/IncompleteTodo");
    } catch (error) {
      console.log(error, "エラーが発生しました");
    }
  }
};

//編集保存ボタン
export const clickSaveEdit = (
  id: string,
  editTodo: string,
  editDate: string,
  editTodoDetail: string,
  setEditTodo: React.Dispatch<React.SetStateAction<string>>,
  setEditTodoDetail: React.Dispatch<React.SetStateAction<string>>,
  setEditDate: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const currentUser = auth.currentUser?.displayName;
  if (currentUser) {
    const washingtonRef = doc(db, currentUser, id);
    updateDoc(washingtonRef, {
      todo: editTodo,
      todoDetail: editTodoDetail,
      deadLineDate: editDate,
    });

    setEditTodo("");
    setEditTodoDetail("");
    setEditDate("");
    setIsEditing(false);
  }
};

// AddTodoページでの追加ボタン関数
export const handleSubmit = async (
  e: React.FormEvent,
  additionalTodo: string,
  additionalDate: string,
  additionalTodoDetail: string,
  setAdditionalDate: React.Dispatch<React.SetStateAction<string>>,
  setAdditionalTodoDetail: React.Dispatch<React.SetStateAction<string>>,
  setAdditionalTodo: React.Dispatch<React.SetStateAction<string>>,
  router: AppRouterInstance
) => {
  e.preventDefault();
  // 現在のユーザ
  const currentUser = auth.currentUser?.displayName;

  let isFormatCheck: boolean = true;
  let alertMessage: string = "";
  if (additionalTodo === "") {
    alertMessage += "TODOを入力してください\n";
    isFormatCheck = false;
  }
  if (additionalDate === "") {
    alertMessage += "期限を入力してください";
    isFormatCheck = false;
  }
  // フォーマット通り入力しているか
  if (isFormatCheck) {
    //ログインユーザがtrueか
    if (currentUser) {
      await addDoc(collection(db, currentUser), {
        todo: additionalTodo,
        deadLineDate: additionalDate,
        todoDetail: additionalTodoDetail,
        status: "Incomplete",
      });
      setAdditionalDate("");
      setAdditionalTodo("");
      setAdditionalTodoDetail("");
      router.push("/components/IncompleteTodo");
    }
  } else {
    alert(alertMessage);
  }
};

//ログインクリック処理
export const loginSubmit = async (
  loginData: UserDataType,
  setAuthError: React.Dispatch<React.SetStateAction<string>>,
  router: AppRouterInstance
) => {
  const { email, password } = loginData;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/components/IncompleteTodo");
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const errorCode = firebaseError.code;
    const errorMessage = firebaseError.message;
    console.log(errorCode, "ログイン処理エラーコード");
    console.log(errorMessage, "ログイン処理エラーメッセージ");
    setAuthError("パスワードまたはメールアドレスが間違えています");
  }
};

//ログアウトクリック時処理
export const clickLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error, "サインアウトでエラーが発生しました");
  }
};

//ユーザ情報をfirebaseへ登録ボタン処理
export const registrationButton = async (
  useData: registrationUserTypes,
  setAuthError: React.Dispatch<React.SetStateAction<string>>,
  router: AppRouterInstance
) => {
  // エラーメッセージの初期化
  setAuthError("");
  //入力されたemail, password, nameを分割代入
  const { email, password, name } = useData;
  // firebaseへemailとパスワードを登録
  const isEmailPWSuccess = await registrationEmailPassword(email, password, setAuthError);
  // エラーが発生していた場合処理を止める
  if (!isEmailPWSuccess) {
    console.log('emailで処理をストップしました')
    return;
  }
  //firebaseへユーザ名を登録
  const isNameSuccess = await registrationUserName(name);
  if (!isNameSuccess) {
    setAuthError("名前登録でエラーが発生しました");
    return;
  }

  //メール認証を送信
  const EmailVerificationSuccess = await registrationEmailVerification();
  if (!EmailVerificationSuccess) {
    setAuthError("メール認証でエラーが発生しています");
    return;
  }
  router.push("/");
};

// firebaseへメールアドレスとパスワードを登録
const registrationEmailPassword = async (
  email: string,
  password: string,
  setAuthError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    // 入力したemail,passwordをfirebaseへ登録
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user, "ユーザ情報登録成功！");
    // 判定フラグにtrueを返す
    return true
  } catch (error) {
    //firebaseの出力するエラーの型を指定
    const firebaseError = error as FirebaseError;
    const errorCode = firebaseError.code;
    const errorMessage = firebaseError.message;
    console.log(errorCode, "エラーコード");
    console.log(errorMessage, "email,password登録でのエラーメッセージ");
    //重複したメールアドレスがないか
    if (firebaseError.code === "auth/email-already-in-use") {
      setAuthError("すでに登録済みのメールアドレスです");
    }
    return false;
  }
};

//firebaseへユーザ名を登録処理
const registrationUserName = async (name: string) => {
  try {
    // ユーザが作成されている場合場合
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      console.log("名前登録成功しました");
    }
    //判定フラグにtrueを返す
    return true
  } catch (error) {
    console.log(error, "名前登録でエラーが発生しました");
    return false;
  }
};

const registrationEmailVerification = async () => {
  try {
    // ユーザが作成できているか
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      console.log("認証メールを送信しました！");
    }
    //判定フラグにtrueを返す
    return true
  } catch (error) {
    console.log(error, "認証メール送信でエラーが発生しました");
    return false;
  }
};

//重複したメールアドレスチェック
