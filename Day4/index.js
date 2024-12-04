/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js. 

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from './data.js';

// DOM Elements
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const messageContainer = document.querySelector('.message-container');
const emojiContainer = document.querySelector('.emoji-clues-container');
const submitButton = guessForm.querySelector('button');

// Game State
let availableFilms = [...films];
let currentFilm = null;
let remainingGuesses = 3;
let isTransitioning = false;
let isGameOver = false;

// Smart Title Comparison Function
function isTitleMatch(guess, correctTitle) {
  // Convert both to lowercase and trim spaces
  guess = guess.toLowerCase().trim();
  correctTitle = correctTitle.toLowerCase();

  // Direct match
  if (guess === correctTitle) return true;

  // Handle "The" variations
  if (correctTitle.startsWith('the ')) {
    const withoutThe = correctTitle.slice(4);
    if (guess === withoutThe) return true;
  } else {
    if (guess === 'the ' + correctTitle) return true;
  }

  // Handle common abbreviations and variations
  const commonVariations = {
    xmas: 'christmas',
    'nightmare before xmas': 'the nightmare before christmas',
    polar: 'the polar express',
    'the polar': 'the polar express',
    grinch: 'the grinch',
    'love actually': 'love actually',
    rudolf: 'rudolph the red-nosed reindeer',
    rudolph: 'rudolph the red-nosed reindeer',
    'rudolph the red nosed reindeer': 'rudolph the red-nosed reindeer',
  };

  if (commonVariations[guess] === correctTitle) return true;

  // Handle special cases for longer titles
  if (correctTitle === 'rudolph the red-nosed reindeer') {
    if (guess.includes('rudolph') && guess.includes('reindeer')) return true;
  }

  // Handle hyphenation variations
  const dehyphenated = correctTitle.replace(/-/g, ' ');
  if (guess === dehyphenated) return true;

  // Calculate similarity for close matches
  const similarity = calculateStringSimilarity(guess, correctTitle);
  return similarity > 0.85; // Threshold for "close enough"
}

// Levenshtein Distance for string similarity
function calculateStringSimilarity(str1, str2) {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) track[0][i] = i;
  for (let j = 0; j <= str2.length; j++) track[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  const distance = track[str2.length][str1.length];
  const maxLength = Math.max(str1.length, str2.length);
  return (maxLength - distance) / maxLength;
}

// Helper Functions
function toggleFormInteractivity(disabled) {
  guessInput.disabled = disabled;
  submitButton.disabled = disabled;
  if (disabled) {
    guessForm.classList.add('disabled');
  } else {
    guessForm.classList.remove('disabled');
  }
}

function getRandomFilm() {
  if (availableFilms.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * availableFilms.length);
  const film = availableFilms[randomIndex];
  availableFilms.splice(randomIndex, 1);
  return film;
}

function updateDisplay() {
  if (!currentFilm) {
    emojiContainer.textContent = '';
    messageContainer.textContent = "That's all folks!";
    isGameOver = true;
    toggleFormInteractivity(true);
    return;
  }

  emojiContainer.textContent = currentFilm.emoji.join(' ');
  emojiContainer.setAttribute('aria-label', currentFilm.ariaLabel);
}

function setMessage(text, isCorrect = null) {
  messageContainer.textContent = text;
  messageContainer.className = 'message-container';
  if (isCorrect === true) messageContainer.classList.add('correct');
  if (isCorrect === false) messageContainer.classList.add('incorrect');
}

function nextRound() {
  isTransitioning = false;
  currentFilm = getRandomFilm();
  remainingGuesses = 3;
  guessInput.value = '';

  if (currentFilm) {
    toggleFormInteractivity(false);
    setMessage('You have 3 guesses remaining.');
    updateDisplay();
  } else {
    updateDisplay(); // Will show game over state
  }
}

// Game Logic
function handleGuess(guess) {
  if (isTransitioning || isGameOver) return;

  if (isTitleMatch(guess, currentFilm.title)) {
    setMessage('Correct!', true);
    isTransitioning = true;
    toggleFormInteractivity(true);
    setTimeout(nextRound, 3000);
  } else {
    remainingGuesses--;

    if (remainingGuesses === 0) {
      setMessage(`The film was ${currentFilm.title}!`, false);
      isTransitioning = true;
      toggleFormInteractivity(true);
      setTimeout(nextRound, 3000);
    } else {
      setMessage(
        `Incorrect! You have ${remainingGuesses} ${
          remainingGuesses === 1 ? 'guess' : 'guesses'
        } remaining.`,
        false
      );
    }
  }
}

// Event Listeners
guessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!guessInput.value.trim() || isTransitioning || isGameOver) return;
  handleGuess(guessInput.value);
  guessInput.value = '';
});

// Disable submit button when input is empty
guessInput.addEventListener('input', (e) => {
  submitButton.disabled =
    !e.target.value.trim() || isTransitioning || isGameOver;
});

// Initialize Game
nextRound();
