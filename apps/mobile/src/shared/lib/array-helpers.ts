export const addElementBetween = <T, B>(
  array: T[],
  getElement: (element: T, index: number) => B
) => {
  return array.flatMap((element, index, arr) => {
    if (index === arr.length - 1) {
      return element;
    } else {
      return [element, getElement(element, index)];
    }
  });
};
