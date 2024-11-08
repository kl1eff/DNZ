import { makeAutoObservable } from "mobx";

export default class CartStore {
  constructor() {
    this._cart = [];
    makeAutoObservable(this);
  }

  setCart(cart) {
    this._cart = cart;
  }

  addToCart(item) {
    this._cart = [...this._cart, item];
  }

  deleteFromCart(id) {
    this._cart = this._cart.filter((item) => item.id != id);
  }


  updateAmount(deviceId, newAmount) {
    const item = this._cart.find((item) => item.deviceInfo.id === deviceId);
    if (item) {
      item.amount = newAmount;
    }
  }

  get cart() {
    return this._cart;
  }
}