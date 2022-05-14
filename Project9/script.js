const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'book', amount: -10 },
  { id: 4, text: 'camera', amount: 150 },
];

let transactions = dummyTransactions;

//add transactions to DOM list
function addTransactionDOM(transaction) {
  //Sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">X</button>`;

  list.appendChild(item);
}

//Update balance and expense
function updateValues() {
  const amount = transactions.map((transaction) => transaction.amount);

  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerHTML = `$${total}`;
  money_minus.innerHTML = `$${expense}`;
  money_plus.innerHTML = `$${income}`;
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
