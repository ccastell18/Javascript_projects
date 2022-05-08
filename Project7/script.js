const wordEl = document.getElementById('word');
const wrongLettersEL = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'wizard'];

let selectWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function updateWrongLetters() {
  console.log('update wrong');
}

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//display word
function displayWord() {
  wordEl.innerHTML = `${selectWord
    .split('')
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}`;
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectWord) {
    finalMessage.innerText = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});
displayWord();
