const products = [
  { id: 1, name: "Original blend 200g", price: 500 },
  { id: 2, name: "Original blend 500g", price: 900 },
  { id: 3, name: "Special blend 200g", price: 700 },
  { id: 4, name: "Special blend 500g", price: 1200 }
];

const productElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
  const productId = parseInt(productElement.value);
  const number = parseInt(numberElement.value);
  const product = products.find(item => item.id === productId);
  const purchase = {
    id: product.id,
    name: product.name,
    price: product.price,
    number: number
  };

  const existing = purchases.findIndex(item => item.id === purchase.id);
  if (existing === -1) {
    purchases.push(purchase);
  } else {
    purchases[existing].number += purchase.number;
  }

  alert(`${display()}\nSubtotal: ${subtotal()} yen`);

  productElement.value = "0";
  numberElement.value = "";
}

function display() {
  return purchases.map(purchase => {
    const itemLabel = purchase.number > 1 ? "items" : "item";
    return `${purchase.name} ${purchase.price}yen: ${purchase.number} ${itemLabel}`;
  }).join("\n");
}

function subtotal() {
  return purchases.reduce((sum, purchase) => {
    return sum + purchase.price * purchase.number;
  }, 0);
}

function calcPostageFromPurchase(sum) {
  if (sum === 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000) {
    return 500;
  } else {
    return 250;
  }
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  const total = sum + postage;
  alert(`${display()}\nSubtotal: ${sum} yen\nShipping: ${postage} yen\nTotal: ${total} yen`);
  purchases = [];
  productElement.value = "0";
  numberElement.value = "";
}
