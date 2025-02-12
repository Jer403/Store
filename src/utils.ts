export function replaceString(
  text: string | null,
  replace: string,
  replaceFor: string
) {
  if (text == null) return "";
  let newString = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] == replace) newString += replaceFor;
    else newString += text[i];
  }
  return newString;
}

export function filterADifferenceB<T>(A: Array<T>, B: Array<T>) {
  const difference = A.filter((itemA) => {
    const index = B.findIndex((itemB) => itemB == itemA);
    if (index == -1) return true;
    return false;
  });
  return difference;
}

export function removeDoubles<T>(arrays: Array<T>) {
  const masterArray = [] as Array<T>;
  arrays.forEach((element) => {
    masterArray.concat(element);
  });

  const newArr = [] as Array<T>;
  const finalArr = masterArray.filter((item) => {
    const find = newArr.find((itemN) => itemN == item);
    if (find) return false;
    newArr.push(item);
    return true;
  });

  return finalArr;
}

export function saveInLocalStorage({
  item,
  value,
}: {
  item: string;
  value: string;
}) {
  localStorage.setItem(item, value);
}

export function getUrlParam(param: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
}
