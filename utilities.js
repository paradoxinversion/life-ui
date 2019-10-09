/**
 * Creates a unique ID for an object
 */
export const getUID = () => {
  const pre = Date.now();
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let string = "";
  for (let i = 0; i < 8; i++) {
    string += letters[Math.floor(Math.random() * letters.length)];
  }
  const uid = `${pre}${string}`;
  return uid;
};

export const swapArrayElements = function(arr, indexA, indexB) {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
  return arr;
};
