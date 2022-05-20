const draggable_list = document.getElementById('draggable-list');
console.log(draggable_list);
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffet',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];

let dragStartIndex;

createList();

//Insert List Items into DOM
function createList() {
  [...richestPeople].forEach((person, index) => {
    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);

    listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div clas="draggable" draggable="true">
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
    `;

    listItems.push(listItem);

    draggable_list.appendChild(listItem);
  });
}
