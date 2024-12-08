/*
Challenge  
1. Your challenge is to build a Christmas take on the classic game "Hangman" where a player attempts to guess a word by selecting letters to save a snowman from melting.
- The snowman is made up of 6 parts: hat, arm, nose, scarf, head, and body. These are separate images and have been positioned with CSS.
- At the start of the game, a player can see a number of dashes, with a dash for each letter of the word. So if the word was TREE the player would see - - - -
- The player selects a letter. 
- If that letter is in the word, that letter replaces the dash in the corresponding position. For the word "TREE", if the player has selected the letter E, they will see --EE.
- If the selected letter does not appear in the word, one part of the snowman gets removed.
- If the player guesses the entire word, they win! 
    - any removed parts of the snowman are reinstated.
    - the snowman gets sunglasses
    - the message "You Win!" is displayed in the "guess-container" div.
-If the player guesses wrong 6 times: 
    - only a puddle remains.
    - the message "You Lose!" is displayed in the "guess-container" div.
    
*** Stretch Goals *** 

- Disable the letter button once a letter has been used.
- Add a "New Game" button that appears at the end of a game and resets the app. (You will need to create an array of words to guess)
*/

// Import needed functions
import { renderKeyboard } from './keyboard.js';

// Initialize DOM elements
const guessContainer = document.getElementById('guess-container');
const snowmanParts = document.getElementsByClassName('snowman-part');
const sunglasses = document.querySelector('.sunglasses');
const keyboard = document.getElementById('keyboard-container');

// Array of Christmas-themed words
const allWords = [
  'gift',
  'snow',
  'sled',
  'star',
  'tree',
  'holly',
  'santa',
  'bells',
  'angel',
  'elves',
  'candy',
  'carol',
  'merry',
  'jolly',
  'peace',
];

// Track available and used words
let availableWords = [...allWords];
let usedWords = [];

// Game state variables
let word = '';
let guesses = 6;
let guessedLetters = new Set();
let guessArr = [];

// Initialize keyboard handler
keyboard.addEventListener('click', checkGuess);

function checkGuess(event) {
  // Only process button clicks
  if (event.target.tagName !== 'BUTTON' || event.target.id === 'new-game')
    return;

  const letter = event.target.textContent.toLowerCase();
  // Prevent duplicate guesses
  if (guessedLetters.has(letter)) return;

  // Track guess
  guessedLetters.add(letter);

  if (word.includes(letter)) {
    // Correct guess - update word display
    word.split('').forEach((char, index) => {
      if (char === letter) {
        guessArr[index] = letter;
      }
    });
    renderGuess();

    // Check if all instances of the letter have been found
    const remainingInstances = word
      .split('')
      .some((char, index) => char === letter && guessArr[index] === '-');

    // Only disable the button if no more instances of the letter remain
    if (!remainingInstances) {
      event.target.disabled = true;
    }

    // Check for win
    if (!guessArr.includes('-')) {
      handleWin();
    }
  } else {
    // Wrong guess - remove snowman part
    guesses--;
    if (snowmanParts.length >= guesses && guesses >= 0) {
      snowmanParts[guesses].style.visibility = 'hidden';
    }

    event.target.disabled = true;

    // Check for loss
    if (guesses === 0) {
      handleLoss();
    }
  }
}

function renderGuess() {
  const guessHtml = guessArr
    .map((char) => `<div class="guess-box">${char}</div>`)
    .join('');

  guessContainer.innerHTML = `
        <div class="guess-word">
            ${guessHtml}
        </div>
    `;
}

function handleWin() {
  // Show all snowman parts
  Array.from(snowmanParts).forEach((part) => {
    part.style.visibility = 'visible';
  });
  // Add sunglasses
  sunglasses.style.visibility = 'visible';
  // Show win message and new game button
  guessContainer.innerHTML = `
        <div class="guess-word">
            <span class="message win-message">You Win!</span>
            <button id="new-game" class="new-game-btn">New Game</button>
        </div>
    `;
  // Disable keyboard
  disableKeyboard();
}

function handleLoss() {
  // Show loss message and new game button
  guessContainer.innerHTML = `
        <div class="guess-word">
            <span class="message lose-message">You Lose!</span>
            <button id="new-game" class="new-game-btn">New Game</button>
        </div>
    `;
  // Disable keyboard
  disableKeyboard();
}

function disableKeyboard() {
  const buttons = document.querySelectorAll('#keyboard-container button');
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function resetGame() {
  // Check if all words have been used
  if (availableWords.length === 0) {
    guessContainer.innerHTML = `
            <div class="guess-word">
                <div class="message">
                    <p>That's all the words for today!</p>
                    <p>You've played all ${allWords.length} words.</p>
                </div>
            </div>
        `;
    // Hide snowman parts and disable keyboard
    Array.from(snowmanParts).forEach((part) => {
      part.style.visibility = 'hidden';
    });
    disableKeyboard();
    return;
  }

  // Reset game state
  guesses = 6;
  guessedLetters.clear();

  // Choose new random word from available words
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  word = availableWords[randomIndex];

  // Move word from available to used
  availableWords.splice(randomIndex, 1);
  usedWords.push(word);

  // Reset snowman
  Array.from(snowmanParts).forEach((part) => {
    part.style.visibility = 'visible';
  });
  sunglasses.style.visibility = 'hidden';

  // Reset keyboard
  renderKeyboard();

  // Reset word display
  guessArr = Array(word.length).fill('-');
  renderGuess();
}

// Add event listener for new game button
document.addEventListener('click', (event) => {
  if (event.target.id === 'new-game') {
    resetGame();
  }
});

// Initialize first game
resetGame();

// Help Modal functionality
const modal = document.getElementById('help-modal');
const helpBtn = document.getElementById('help-btn');
const closeBtn = document.querySelector('.close');

helpBtn.onclick = function () {
  modal.style.display = 'block';
};

closeBtn.onclick = function () {
  modal.style.display = 'none';
};

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
