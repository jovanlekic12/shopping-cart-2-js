import "./style.css";
import "./data.js";
import { items } from "./data.js";

const list = document.querySelector(".shop__list");
const counterIcon = document.querySelector(".nav__bar__icon__number");
const cartIcon = document.querySelector(".nav__bar__icon");
const cartOverlay = document.querySelector(".overlay");
const shoppingCart = document.querySelector(".shopping__cart");

class CartManager {
  items;
  constructor() {
    this.items = [];
  }

  addItem(item) {
    // const newCartItems = this.items.map((item) => 'jovan')
    this.items.push(item);
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    for (let i = 0; i <= this.items.length - 1; i++) {
      totalQuantity = totalQuantity + this.items[i].quantity;
    }
    return totalQuantity;
  }
}

class ShopManager {
  items;
  constructor() {
    this.items = [];
  }

  getTotalQuantity(value) {
    let totalQuantity = 0;
    totalQuantity = totalQuantity + value;
    return totalQuantity;
  }

  addItem(item) {
    this.items.push(item);
  }

  fillItems() {
    items.forEach((item) => {
      this.addItem(
        new Item(item.name, item.price, item.quantity, item.inStock)
      );
    });
  }

  renderItems(items) {
    list.innerHTML = "";
    items.forEach((item) => {
      const html = `<li class="list__item" id="${item.id}">
      <h1 class="item__name">Name: ${item.name}</h1>
      <h1 class="item__price">Price: ${item.price}$</h1>
      <div class="item__quantity__div">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="arrow__left arrow">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <h1 class="item__quantity">${item.quantity}</h1>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="arrow__right arrow">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      </div>
      <h1 class="item__max__quantity">In stock: ${item.inStock}</h1>
      <button class="btn btn__add">ADD TO CART</button>
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
  inStock;
  constructor(name, price, quantity, inStock) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.inStock = inStock;
  }

  incrementQuantity() {
    this.quantity !== this.inStock ? this.quantity++ : this.quantity;
  }
  decrementQuantity() {
    this.quantity > 1 ? this.quantity-- : this.quantity;
  }
}

const shopManager = new ShopManager();
const cartManager = new CartManager();
shopManager.fillItems();
shopManager.renderItems(shopManager.items);
const buttonsAddToCart = document.querySelectorAll(".btn__add");
const arrowsLeft = document.querySelectorAll(".arrow__left");
const arrowsRight = document.querySelectorAll(".arrow__right");
cartIcon.addEventListener("click", function () {
  document.querySelector("main").classList.add("hide");
  cartOverlay.style.display = "block";
});

buttonsAddToCart.forEach((button) => {
  button.addEventListener("click", function () {
    const li = button.closest("li");
    const id = li.id;
    const currentItemInCart = cartManager.items.find((item) => item.id == id);
    const currentItem = shopManager.items.find((item) => item.id === id);
    if (!currentItemInCart) {
      cartManager.addItem(currentItem);
      counterIcon.textContent = cartManager.getTotalQuantity();
      console.log(currentItem.quantity);
      return;
    } else if (currentItemInCart) {
      currentItemInCart.quantity += currentItem.quantity;
      console.log(cartManager);
      console.log(currentItemInCart.quantity, currentItem.quantity);
      counterIcon.textContent = cartManager.getTotalQuantity();
      return;
    }
  });
});

arrowsLeft.forEach((arrow) => {
  arrow.addEventListener("click", function () {
    const li = arrow.closest("li");
    const id = li.id;
    const currentItem = shopManager.items.find((item) => item.id === id);
    currentItem.decrementQuantity();
    shopManager.renderItems(shopManager.items);
  });
});

arrowsRight.forEach((arrow) => {
  arrow.addEventListener("click", function () {
    // const li = arrow.closest("li");
    // const id = li.id;
    const currentItem = shopManager.items.find(
      (item) => item.id === arrow.closest("li").id
    );
    currentItem.incrementQuantity();
    shopManager.renderItems(shopManager.items);
    console.log(currentItem);
  });
});
