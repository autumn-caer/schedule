// import firebase from "firebase";
import { FirebaseError } from "firebase/app";
import { storage, auth } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FireBaseLoginInfo } from "../types/types";

export const uploadImage = async (
  imageUri: string,
  folder: string,
  path: string
) => {
  const storageRef = ref(storage, `${folder}/${path}`);
  const response = await fetch(imageUri);
  const blob = await response.blob();

  await uploadBytes(storageRef, blob).then((snapshot) => {});
};

export const downloadImage = async (folder: string, path: string) => {
  const storageRef = ref(storage, `${folder}/${path}`);
  return await getDownloadURL(storageRef);
};

export const deleteImage = async (folder: string, path: string) => {
  const storageRef = ref(storage, `${folder}/${path}`);
  deleteObject(storageRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

export const get_image_url = async (folder: string, id: string | null) => {
  if (!id) {
    return "";
  }
  var image_url = "";
  await downloadImage(folder, id)
    .then((url) => {
      image_url = url;
    })
    .catch((error) => {
      console.log(error);
    });

  return image_url;
};

const ERR_MSG_INVALID_EMAIL = "メールアドレス形式が正しくありません。";
const ERR_MSG_USER_DISABLED = "無効なユーザーです。";
const ERR_MSG_USER_NOT_FOUND = "メールアドレスが登録されていません。";
const ERR_MSG_WRONG_PASSWORD = "パスワードが違います。";
const ERR_MSG_TOO_MANY_REQUESTS = "アカウントが一時的にロックされています。";
const ERR_MSG_FAILED = "通信失敗しました。";

export const signUpFirebase = async (
  email: string,
  password: string
): Promise<FireBaseLoginInfo> => {
  try {
    const user_info = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (!user_info.user || !user_info.user.email || user_info.user.uid) {
      // throw new Error("ネットワークアクセス失敗");
      return { email: "", uid: "", error_message: ERR_MSG_FAILED };
    }
    return {
      email: user_info.user.email,
      uid: user_info.user.uid,
      error_message: null,
    };
  } catch (error) {
    return { email: "", uid: "", error_message: createErrorMessage(error) };
  }
};

export const signInFirebase = async (
  email: string,
  password: string
): Promise<FireBaseLoginInfo> => {
  try {
    const user_info = await auth.signInWithEmailAndPassword(email, password);
    if (!user_info.user || !user_info.user.email || user_info.user.uid) {
      // throw new Error("ネットワークアクセス失敗");
      return { email: "", uid: "", error_message: null };
    }
    return {
      email: user_info.user.email,
      uid: user_info.user.uid,
      error_message: ERR_MSG_FAILED,
    };
  } catch (error) {
    return { email: "", uid: "", error_message: createErrorMessage(error) };
  }
};

export const signOutFirebase = async (): Promise<FireBaseLoginInfo> => {
  try {
    await auth.signOut();
    return { email: "", uid: "", error_message: null };
  } catch (error) {
    return { email: "", uid: "", error_message: createErrorMessage(error) };
  }
};

const createErrorMessage = (error: unknown) => {
  var error_message = "";
  if (error instanceof FirebaseError) {
    if (error.code === "auth/invalid-email") {
      // error_message = error.message;
      // メールアドレスの形式がおかしい
      error_message = ERR_MSG_INVALID_EMAIL;
    } else if (error.code === "auth/user-disabled") {
      // ユーザが無効になっている
      error_message = ERR_MSG_USER_DISABLED;
    } else if (error.code === "auth/user-not-found") {
      // ユーザが存在しない
      error_message = ERR_MSG_USER_NOT_FOUND;
    } else if (error.code === "auth/wrong-password") {
      // パスワードが間違っている
      error_message = ERR_MSG_WRONG_PASSWORD;
    } else if (error.code === "auth/too-many-requests") {
      // 何度もパスワードを間違えた
      error_message = ERR_MSG_TOO_MANY_REQUESTS;
    } else {
      // その他
      error_message = ERR_MSG_FAILED;
    }
    error_message = error.message;
  } else {
    error_message = ERR_MSG_FAILED;
  }

  return error_message;
};
