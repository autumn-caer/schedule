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
  return year + "-" + month + "-" + day;
};
