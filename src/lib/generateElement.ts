export const createElement = (id: string): Element => {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  return element;
};

export const addRootElement = (rootElem: Element): void => {
  document.body.appendChild(rootElem);
};
