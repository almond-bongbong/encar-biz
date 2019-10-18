export const createElement = (id: string): Element => {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  return element;
};

// export const addRootElement = (rootElem: Element): void => {
//   document.body.appendChild(rootElem);
// };

export const addRootElement = (elementId: string): void => {
  const element = createElement(elementId);

  if (!document.getElementById(elementId)) {
    document.body.appendChild(element);
  }
};
