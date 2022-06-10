import { db, storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  setDoc,
  doc,
  DocumentData,
  DocumentReference,
  runTransaction,
} from "firebase/firestore";
import { task } from "../types/types";
import { CategoryConverter, TaskConverter } from "../converters/converters";

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
