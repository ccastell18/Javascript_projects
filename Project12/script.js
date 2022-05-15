const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//List of words
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

//init word
let randomWord;

//init score
let score = 0;

//init time;
let time = 10;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : medium;

//set difficulty
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : medium;

//focus on start
text.focus();

//start counting
const timeInterval = setInterval(updateTime, 1000);

//get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

//game over
function gameOver() {
  endgameEl.innerHTML = `
<h1>Time has run out!</h1>
<p>Your final score is ${score}</p>
<button onClick="location.reload()">Reload</button>
`;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

//event listener
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //clear
    e.target.value = '';
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

//settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//setting select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
