'use strict';

// INITIALIZING ELEMENTS
let totalScoreP1 = document.querySelector('#score--0');
let totalScoreP2 = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');

// INITIALIZING VALUES
let current = 0;
let tScore = [0, 0];
let activePlayer = 0;

// FUNCTION TO RESET CURRENT SCORE OF PLAYER
function resetCurrentScore() {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = current;
}

// FUNCTION TO SWITCH ACTIVE PLAYER
function switchPlayer(activePlayer) {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${Number(!activePlayer)}`)
    .classList.remove('player--active');
  return activePlayer;
}

// FUNCTION TO BE CALLED WHEN WINNER FOUND
function winner() {
  btnRoll.disabled = true;
  btnHold.disabled = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  diceEl.classList.add('hidden');
}

// ROLL DICE BUTTON
btnRoll.addEventListener('click', function () {
  let randomDice = Math.trunc(Math.random() * 6) + 1;
  if (tScore[0] >= 100 || tScore[1] >= 100)
    winner(); // WINNER WHOSE HIGHSCORE <= 100
  else if (randomDice === 1) {
    diceEl.src = `dice-${randomDice}.png`; // DICE: 1 CASE
    diceEl.classList.remove('hidden');
    resetCurrentScore();
    activePlayer = switchPlayer(activePlayer);
  } else {
    diceEl.src = `dice-${randomDice}.png`; // 1 < DICE <= 6 CASE
    diceEl.classList.remove('hidden');
    current += randomDice;
    document.getElementById(`current--${activePlayer}`).textContent = current;
  }
});

// HOLD BUTTON
btnHold.addEventListener('click', function () {
  tScore[activePlayer] += current;
  document.getElementById(`score--${activePlayer}`).textContent =
    tScore[activePlayer];
  if (tScore[0] >= 100 || tScore[1] >= 100) winner();
  resetCurrentScore();
  activePlayer = switchPlayer(activePlayer);
  //   console.log(activePlayer);
});

// NEW GAME BUTTON
btnNew.addEventListener('click', function () {
  tScore = [0, 0];
  totalScoreP1.textContent = tScore[0];
  totalScoreP2.textContent = tScore[1];
  resetCurrentScore();
  document
    .querySelector(`.player--${Number(!activePlayer)}`)
    .classList.remove('player--winner');
  diceEl.classList.add('hidden');
  btnRoll.disabled = false;
  btnHold.disabled = false;
});
