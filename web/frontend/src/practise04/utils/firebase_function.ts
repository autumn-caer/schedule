import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const uploadImage = async (imageUri: string, path: string) => {
  const storageRef = ref(storage, `/images/${path}`);
  const response = await fetch(imageUri);
  const blob = await response.blob();

  await uploadBytes(storageRef, blob).then((snapshot) => {});
};

export const downloadImage = async (path: string) => {
  const storageRef = ref(storage, `/images/${path}`);
  return await getDownloadURL(storageRef);
};

export const deleteImage = async (path: string) => {
  const storageRef = ref(storage, `/images/${path}`);
  deleteObject(storageRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
