'use strict';

let playerScore = [0, 0];
let currentPlayer = 0;
let currentScore = 0;
let win = false;

document.getElementById(`score--0`).textContent = 0;
document.getElementById(`score--1`).textContent = 0;

const roll = function () {
  if (!win) {
    const numero = Math.trunc(Math.random() * 6) + 1;
    document.querySelector('.dice').setAttribute('src', `dice-${numero}.png`);
    if (numero !== 1) {
      currentScore += numero;
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${currentPlayer}`).textContent = 0;
      currentPlayerFunc();
    }
  }
};
const currentPlayerFunc = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  if (currentPlayer === 1) {
    currentPlayer = 0;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--active');
  } else {
    currentPlayer = 1;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--active');
  }
};
const winner = function () {
  if (playerScore[currentPlayer] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    win = true;
    return true;
  }
  return false;
};
const hold = function () {
  if (!win) {
    playerScore[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      playerScore[currentPlayer];
    currentScore = 0;
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    if (!winner()) currentPlayerFunc();
  }
};
const reset = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  document.querySelector(`.player--${0}`).classList.add('player--active');
  for (let i = 0; i < 2; i++) {
    document.getElementById(`score--${i}`).textContent = 0;
    document.getElementById(`current--${i}`).textContent = 0;
  }

  playerScore = [0, 0];
  currentPlayer = 0;
  currentScore = 0;
  win = false;
};

document.querySelector('.btn--roll').addEventListener('click', roll);
document.querySelector('.btn--hold').addEventListener('click', hold);
document.querySelector('.btn--new').addEventListener('click', reset);
