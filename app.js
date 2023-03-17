const startBtnNode = document.querySelector('#start');
const screensNode = document.querySelectorAll('.screen');
const timeListNode = document.querySelector('#time-list'); 
const timeNode = document.querySelector('#time');
const boardNode = document.querySelector('#board');
let time = 0;
let score = 0;
const colors = ['#FF6400', '#FFA900', '#1142AA', '#00A383', '#01939A', '#FBFE00', '#7309AA', '#BDF400'];

startBtnNode.addEventListener('click', (event) => {
  event.preventDefault();
  screensNode[0].classList.add('up');
});

timeListNode.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));

    screensNode[1].classList.add('up');

    startGame();
  }
})

boardNode.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;

    event.target.remove();

    createRandomCircle();

  }
})

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeNode.innerHTML = `00:${value}`;
}

function finishGame() {
  timeNode.parentNode.classList.add('hide');
  boardNode.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60); 
  const {width, height} = boardNode.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);;
  const color = getRandomColor();

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = color;

  boardNode.append(circle);
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);

  return colors[index];
}