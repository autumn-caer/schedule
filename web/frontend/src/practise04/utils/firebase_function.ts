// import firebase from "firebase";
import { FirebaseError } from "firebase/app";
import { storage, auth, db } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";

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

    if (!user_info.user || !user_info.user.email || !user_info.user.uid) {
      return { user_id: "", email: "", uid: "", error_message: ERR_MSG_FAILED };
    }

    let fireBaseLoginInfo: FireBaseLoginInfo = {
      uid: user_info.user.uid,
      email: user_info.user.email,
      user_id: null,
    };

    //Collection:usersに登録する
    const createRef = doc(collection(db, "users"));
    await setDoc(createRef, fireBaseLoginInfo);

    return {
      user_id: createRef.id,
      email: user_info.user.email,
      uid: user_info.user.uid,
      error_message: null,
    };
  } catch (error) {
    return {
      user_id: "",
      email: "",
      uid: "",
      error_message: createErrorMessage(error),
    };
  }
};

export const signInFirebase = async (
  email: string,
  password: string
): Promise<FireBaseLoginInfo> => {
  try {
    const user_info = await auth.signInWithEmailAndPassword(email, password);
    if (!user_info.user || !user_info.user.email || !user_info.user.uid) {
      // throw new Error("ネットワークアクセス失敗");
      return { user_id: "", email: "", uid: "", error_message: ERR_MSG_FAILED };
    }

    return {
      user_id: await fetchUserId(user_info.user.uid),
      email: user_info.user.email,
      uid: user_info.user.uid,
      error_message: null,
    };
  } catch (error) {
    return {
      user_id: "",
      email: "",
      uid: "",
      error_message: createErrorMessage(error),
    };
  }
};

export const signOutFirebase = async (): Promise<FireBaseLoginInfo> => {
  try {
    await auth.signOut();
    return { user_id: "", email: "", uid: "", error_message: null };
  } catch (error) {
    return {
      user_id: "",
      email: "",
      uid: "",
      error_message: createErrorMessage(error),
    };
  }
};

export const fetchUserId = async (auth_uid: string) => {
  const user_q = query(collection(db, "users"), where("uid", "==", auth_uid));

  const user_snapshots = await getDocs(user_q);
  var user_id: string = "";
  await user_snapshots.forEach(async (user_snapshot) => {
    user_id = user_snapshot.id;
  });

  return user_id;
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
