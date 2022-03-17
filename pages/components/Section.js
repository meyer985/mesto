import { Card } from "./Card.js";

export class Section {
  constructor({ items, renderer }, selector) {
    this._cardsDataArray = items; //массив данных для создания карточки
    this._selector = selector; // куда вставлять
    this._renderer = renderer; //коллбэк для мягкого связывания
  }

  cardRenderer() {
    //метод отрисовки
    this._cardsDataArray.forEach((element) => this._renderer(element));
  }

  addItem(element) {
    //метод добавки карточки
    this._selector.append(element);
  }
}
