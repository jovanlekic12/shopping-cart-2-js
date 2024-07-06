import "./style.css";
import "./data.js";
import { items } from "./data.js";

const list = document.querySelector(".shop__list");
const cartList = document.querySelector(".cart__list");
const counterIcon = document.querySelector(".nav__bar__icon__number");
const cartIcon = document.querySelector(".nav__bar__icon");
const cartOverlay = document.querySelector(".overlay");
const shoppingCart = document.querySelector(".shopping__cart");
const backToShopping = document.querySelector(".back__to__shopping");
const priceCart = document.querySelector(".price");
const totalPrice = document.querySelector(".total__price");
class CartManager {
  items;
  constructor() {
    this.items = [];
  }

  addItem(item) {
    const newItem = { ...item };
    const addToCartItem = new Item(
      newItem.name,
      newItem.price,
      newItem.quantity,
      newItem.inStock,
      newItem.id
    );
    this.items.push(addToCartItem);
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    for (let i = 0; i <= this.items.length - 1; i++) {
      totalQuantity = totalQuantity + this.items[i].quantity;
    }
    return totalQuantity;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i <= this.items.length - 1; i++) {
      totalPrice = totalPrice + this.items[i].getTotalPrice();
    }
    return totalPrice;
  }

  deleteItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  renderItems() {
    cartList.innerHTML = "";
    this.items.forEach((item) => {
      const html = `<li class="list__item" id="${item.id}">
      <h1 class="item__name">Name: ${item.name}</h1>
      <h1 class="item__quantity">Quantity: ${item.quantity}
      <h1 class="item__price">Price: ${item.getTotalPrice()}$</h1>
      <button class="btn btn__delete">DELETE</button>
      </li>`;
      cartList.insertAdjacentHTML("afterbegin", html);
    });
  }
}

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
  constructor(name, price, quantity, inStock, id = self.crypto.randomUUID()) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.inStock = inStock;
  }

  incrementQuantity() {
    // this.inStock > 0 ? this.quantity++ : this.quantity;
    this.quantity++;
  }
  decrementQuantity() {
    // this.quantity > 1 ? this.quantity-- : this.quantity;
    this.quantity--;
  }
  decrementInStock() {
    if (this.inStock > 0 && this.inStock >= this.quantity) {
      this.inStock = this.inStock - this.quantity;
    } else {
      return false;
    }
  }
  getTotalPrice() {
    return this.price * this.quantity;
  }
}

const shopManager = new ShopManager();
const cartManager = new CartManager();
shopManager.fillItems();
shopManager.renderItems(shopManager.items);
const buttonsAddToCart = document.querySelectorAll(".btn__add");
const arrowsLeft = document.querySelectorAll(".arrow__left");
const arrowsRight = document.querySelectorAll(".arrow__right");
const counters = document.querySelectorAll(".item__quantity");
const inStockCounters = document.querySelectorAll(".item__max__quantity");
cartIcon.addEventListener("click", function () {
  document.querySelector("main").classList.add("hide");
  cartOverlay.classList.remove("hide");
});

backToShopping.addEventListener("click", function () {
  document.querySelector("main").classList.remove("hide");
  cartOverlay.classList.add("hide");
});

buttonsAddToCart.forEach((button) => {
  button.addEventListener("click", function () {
    const li = button.closest("li");
    const id = li.id;
    const currentItemInCart = cartManager.items.find((item) => item.id == id);
    const currentItem = shopManager.items.find((item) => item.id === id);
    if (!currentItemInCart) {
      cartManager.addItem(currentItem);
      cartManager.renderItems();
      priceCart.textContent = `Price: ${cartManager.getTotalPrice()}$`;
      totalPrice.textContent = `Total: ${
        cartManager.getTotalPrice() + cartManager.getTotalPrice() * 0.2
      }$`;
      currentItem.decrementInStock();
      counterIcon.textContent = cartManager.getTotalQuantity();
      inStockCounters.forEach((counter) => {
        if (counter.closest("li").id === li.id) {
          counter.textContent = `In stock: ${currentItem.inStock}`;
        }
      });
      return;
    } else if (currentItemInCart) {
      if (
        currentItem.inStock > 0 &&
        currentItem.inStock >= currentItem.quantity
      )
        currentItemInCart.quantity += currentItem.quantity;
      cartManager.renderItems();
      priceCart.textContent = `Price: ${cartManager.getTotalPrice()}$`;
      totalPrice.textContent = `Total: ${
        cartManager.getTotalPrice() + cartManager.getTotalPrice() * 0.2
      }$`;
      currentItem.decrementInStock();
      inStockCounters.forEach((counter) => {
        if (counter.closest("li").id === li.id) {
          counter.textContent = `In stock: ${currentItem.inStock}`;
        }
      });
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
    counters.forEach((counter) => {
      if (counter.closest("li").id === li.id) {
        counter.textContent = currentItem.quantity;
      }
    });
  });
});

arrowsRight.forEach((arrow) => {
  arrow.addEventListener("click", function () {
    const li = arrow.closest("li");
    const id = li.id;
    const currentItem = shopManager.items.find((item) => item.id === id);
    currentItem.incrementQuantity();
    counters.forEach((counter) => {
      if (counter.closest("li").id === li.id) {
        counter.textContent = currentItem.quantity;
      }
    });
  });
});

cartList.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn__delete")) {
    const li = event.target.closest("li");
    const id = li.id;
    const currentItemInCart = cartManager.items.find((item) => item.id == id);
    const currentItem = shopManager.items.find((item) => item.id === id);
    currentItem.inStock = currentItem.inStock + currentItemInCart.quantity;
    inStockCounters.forEach((counter) => {
      if (counter.closest("li").id === li.id) {
        counter.textContent = `In stock: ${currentItem.inStock}`;
      }
    });
    cartManager.deleteItem(id);
    priceCart.textContent = `Price: ${cartManager.getTotalPrice()}$`;
    totalPrice.textContent = `Total: ${
      cartManager.getTotalPrice() + cartManager.getTotalPrice() * 0.2
    }$`;
    li.remove();
    if (cartManager.items.length === 0) {
      cartList.innerHTML = `<li><h1 class="cart__title">YOUR CART IS EMPTY</h1></li>`;
    }
    counterIcon.textContent = cartManager.items.length;
  }
});
