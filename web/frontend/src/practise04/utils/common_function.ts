export const sliceByNumber = <T>(array: Array<T>, num: number) => {
  const length = Math.ceil(array.length / num);
  return new Array(length)
    .fill(null)
    .map((_, i) => array.slice(i * num, (i + 1) * num));
};
