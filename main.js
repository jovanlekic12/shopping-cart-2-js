import "./style.css";
import "./data.js";
import { items } from "./data.js";

const list = document.querySelector(".shop__list");

class ShopManager {
  items;
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  fillItems() {
    items.forEach((item) => {
      this.addItem(
        new Item(item.name, item.price, item.quantity, item.maxQuantity)
      );
    });
  }

  renderItems(items) {
    list.innerHTML = "";
    items.forEach((item) => {
      const html = `<li class="list__item" id="${item.id}">
      <h1 class="item__name">Name:${item.name}</h1>
      <h1 class="item__price">Price:${item.price}$</h1>
      <div class="item__quantity__div">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="arrow__left arrow">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>

      <h1 class="item__quantity">${item.quantity}</h1>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="arrow__right arrow">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      </div>
      <h1 class="item__max__quantity">Max Quantity:${item.maxQuantity}</h1>
      <button class="btn btn__add">ADD TO CHART</button>
      <button class="btn btn__delete">DELETE</button>
      </li>`;
      list.insertAdjacentHTML("afterbegin", html);
    });
  }
}

class Item {
  id;
  name;
  price;
  quantity;
  maxQuantity;
  constructor(name, price, quantity, maxQuantity) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.maxQuantity = maxQuantity;
  }
}

const shopManager = new ShopManager();
shopManager.fillItems();
shopManager.renderItems(shopManager.items);
console.log(shopManager);
