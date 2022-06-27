export const sliceByNumber = <T>(array: Array<T>, num: number) => {
  const length = Math.ceil(array.length / num);
  return new Array(length)
    .fill(null)
    .map((_, i) => array.slice(i * num, (i + 1) * num));
};

export const formatDateYYYYMMDD = (date: Date) => {
  var year = date.getFullYear();
  var month = ("00" + (date.getMonth() + 1)).slice(-2);
  var day = ("00" + date.getDate()).slice(-2);
  return year + "/" + month + "/" + day;
};

export const onFileInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImageName: (value: React.SetStateAction<string | null>) => void,
  setImage: (value: React.SetStateAction<string>) => void
) => {
  if (e.target != null && e.target.files != null) {
    setImageName(e.target.files.item(0)!.name);
    setImage(URL.createObjectURL(e.target.files.item(0)));
  }
};

export const clearImage = (
  setImageName: (value: React.SetStateAction<string | null>) => void,
  setImage: (value: React.SetStateAction<string>) => void
) => {
  setImageName(null);
  setImage("");
  return;
};

export const arrayShuffle = <T>(array: Array<T>) => {
  for (var i = array.length - 1; 0 < i; i--) {
    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
};

export const isNonNullable = <T>(value: T): value is NonNullable<T> => {
  if (value === null || value === void 0) return false;
  return true;
};
