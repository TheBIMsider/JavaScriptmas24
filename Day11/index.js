/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */

/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */

// Christmas-themed emojis - each one needs a pair
const emojis = ['🎄', '🎁', '🎅', '☃️', '🦌', '🔔', '⭐', '🕯️'];
const gameBoard = document.getElementById('game-board');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let currentScore = 0;
let gameEnded = false;

// Point system configuration
const POINTS = {
  MATCH: 100, // Points awarded for a correct match
  MISTAKE: -20, // Points deducted for an incorrect match
  TIME_BONUS: 10, // Points awarded for quick matches (under 3 seconds)
};

// High score handling
function getHighScore() {
  return localStorage.getItem('christmasGameHighScore') || 0;
}

function setHighScore(score) {
  const currentHigh = getHighScore();
  if (score > currentHigh) {
    localStorage.setItem('christmasGameHighScore', score);
    return true;
  }
  return false;
}

function updateScoreDisplay() {
  document.getElementById('current-score').textContent = currentScore;
  document.getElementById('high-score').textContent = getHighScore();
}

// Double the emojis to create pairs and shuffle them
function shuffleCards() {
  const cardPairs = [...emojis, ...emojis];
  return cardPairs.sort(() => Math.random() - 0.5);
}

// Create card element with front and back
function createCard(emoji, index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-index', index);
  card.setAttribute('data-emoji', emoji);
  card.addEventListener('click', flipCard);
  return card;
}

// Initialize the game board
function initializeGame() {
  gameBoard.innerHTML = '';
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  currentScore = 0;
  gameEnded = false;

  // Remove existing game over message if present
  const existingGameOver = document.getElementById('game-over');
  if (existingGameOver) {
    existingGameOver.remove();
  }

  const shuffledEmojis = shuffleCards();

  shuffledEmojis.forEach((emoji, index) => {
    const card = createCard(emoji, index);
    cards.push(card);
    gameBoard.appendChild(card);
  });

  updateScoreDisplay();
}

// Handle card flip
function flipCard(event) {
  if (gameEnded) return;

  const selectedCard = event.target;

  // Prevent flipping if card is already revealed or if two cards are already flipped
  if (selectedCard.classList.contains('revealed') || flippedCards.length >= 2) {
    return;
  }

  // Reveal the card
  selectedCard.classList.add('revealed');
  selectedCard.textContent = selectedCard.getAttribute('data-emoji');
  flippedCards.push(selectedCard);

  // Check for match when two cards are flipped
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

// Check if the flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  const match =
    card1.getAttribute('data-emoji') === card2.getAttribute('data-emoji');

  if (!match) {
    // Hide cards if they don't match
    card1.classList.remove('revealed');
    card2.classList.remove('revealed');
    card1.textContent = '';
    card2.textContent = '';
    // Deduct points for mistake
    currentScore += POINTS.MISTAKE;
  } else {
    // Add points for match
    currentScore += POINTS.MATCH;
    matchedPairs++;

    // Add matched class for animation
    card1.classList.add('matched');
    card2.classList.add('matched');

    if (matchedPairs === emojis.length) {
      gameEnded = true;
      const isNewHighScore = setHighScore(currentScore);
      showGameOver(isNewHighScore);
    }
  }

  updateScoreDisplay();
  flippedCards = [];
}

function showGameOver(isNewHighScore) {
  const gameOverDiv = document.createElement('div');
  gameOverDiv.id = 'game-over';
  gameOverDiv.className = 'game-over';

  const message = isNewHighScore
    ? `🎉 New High Score: ${currentScore}! 🎉`
    : `Game Over! Final Score: ${currentScore}`;

  gameOverDiv.innerHTML = `
        <h2>${message}</h2>
        <button id="restart-button" class="restart-button">Play Again 🎮</button>
    `;

  document.body.appendChild(gameOverDiv);

  document.getElementById('restart-button').addEventListener('click', () => {
    gameOverDiv.remove();
    initializeGame();
  });
}

// Start the game when the page loads
window.addEventListener('load', () => {
  // Create score display elements
  const scoreContainer = document.createElement('div');
  scoreContainer.className = 'score-container';
  scoreContainer.innerHTML = `
        <div class="score">
            Score: <span id="current-score">0</span>
        </div>
        <div class="high-score">
            High Score: <span id="high-score">0</span>
        </div>
    `;
  document.body.insertBefore(scoreContainer, gameBoard);

  initializeGame();
});
