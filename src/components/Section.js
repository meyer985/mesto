export class Section {
  constructor(selector) {
    this._selector = selector; // куда вставлять
  }

  cardRenderer({ items, renderer }) {
    //метод отрисовки
    items.forEach((item) => renderer(item));
  }

  addItem(element) {
    //метод добавки карточки
    this._selector.prepend(element);
  }
}
