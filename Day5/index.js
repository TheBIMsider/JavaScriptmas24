/* 
This Christmas, you’ve been tasked with running an anagram quiz at 
the family gathering.

You have been given a list of anagrams, but you suspect that some 
of the anagram pairs might be incorrect.

Your job is to write a JavaScript function to loop through the array
and filter out any pairs that aren’t actually anagrams.

For this challenge, spaces will be ignored, so "Be The Helm" would 
be considered a valid anagram of "Bethlehem".
*/

document.addEventListener('DOMContentLoaded', () => {
  // Original anagrams array
  const originalAnagrams = [
    ['Can Assault', 'Santa Claus'],
    ['Refreshed Erudite Londoner', 'Rudolf the Red Nose Reindeer'],
    ['Frosty The Snowman', 'Honesty Warms Front'],
    ['Drastic Charms', 'Christmas Cards'],
    ['Congress Liar', 'Carol Singers'],
    ['The Tin Glints', 'Silent Night'],
    ['Be The Helm', 'Betlehem'],
    ['Is Car Thieves', 'Christmas Eve'],
    ['Present Wraps', 'Paper Answers'],
    ['Merry Times', 'See My Tim R'],
  ];

  let anagrams = [...originalAnagrams]; // Working copy that we'll shuffle
  let currentPairIndex = 0;
  let score = 0;
  let totalAttempts = 0;

  // DOM elements
  const word1Element = document.getElementById('word1');
  const word2Element = document.getElementById('word2');
  const yesButton = document.getElementById('yes-btn');
  const noButton = document.getElementById('no-btn');
  const helpButton = document.getElementById('help-btn');
  const tipElement = document.getElementById('tip');
  const feedbackElement = document.getElementById('feedback');
  const scoreElement = document.getElementById('score');
  const attemptsElement = document.getElementById('attempts');
  const currentQuestionElement = document.getElementById('current-question');
  const gameContent = document.getElementById('game-content');
  const gameOver = document.getElementById('game-over');
  const finalScoreElement = document.getElementById('final-score');
  const playAgainButton = document.getElementById('play-again');

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function areAnagrams(str1, str2) {
    const prepare = (s) =>
      s.toLowerCase().replace(/\s+/g, '').split('').sort().join('');
    return prepare(str1) === prepare(str2);
  }

  function displayCurrentPair() {
    const currentPair = anagrams[currentPairIndex];
    word1Element.textContent = currentPair[0];
    word2Element.textContent = currentPair[1];
    currentQuestionElement.textContent = currentPairIndex + 1;
  }

  function showFeedback(isCorrect, actuallyIsAnagram) {
    feedbackElement.textContent = isCorrect
      ? `Correct! ${
          actuallyIsAnagram ? 'They are anagrams!' : 'They are not anagrams!'
        }`
      : `Wrong! ${
          actuallyIsAnagram ? 'They are anagrams!' : 'They are not anagrams!'
        }`;

    feedbackElement.className = `feedback ${isCorrect ? 'success' : 'error'}`;
    feedbackElement.classList.remove('hidden');
  }

  function updateStats() {
    scoreElement.textContent = score;
    attemptsElement.textContent = totalAttempts;
  }

  function handleGuess(isAnagramGuess) {
    const currentPair = anagrams[currentPairIndex];
    const actuallyIsAnagram = areAnagrams(currentPair[0], currentPair[1]);
    const isCorrect = isAnagramGuess === actuallyIsAnagram;

    if (isCorrect) score++;
    totalAttempts++;

    showFeedback(isCorrect, actuallyIsAnagram);
    updateStats();

    // Disable buttons during feedback
    yesButton.disabled = true;
    noButton.disabled = true;

    setTimeout(() => {
      if (currentPairIndex + 1 < anagrams.length) {
        currentPairIndex++;
        feedbackElement.classList.add('hidden');
        displayCurrentPair();
        yesButton.disabled = false;
        noButton.disabled = false;
      } else {
        endGame();
      }
    }, 2000);
  }

  function endGame() {
    gameContent.classList.add('hidden');
    gameOver.classList.remove('hidden');
    finalScoreElement.textContent = score;
  }

  function resetGame() {
    // Create a new shuffled copy of the original anagrams
    anagrams = shuffleArray([...originalAnagrams]);
    currentPairIndex = 0;
    score = 0;
    totalAttempts = 0;
    updateStats();
    displayCurrentPair();
    feedbackElement.classList.add('hidden');
    gameContent.classList.remove('hidden');
    gameOver.classList.add('hidden');
    yesButton.disabled = false;
    noButton.disabled = false;
  }

  // Event listeners
  yesButton.addEventListener('click', () => handleGuess(true));
  noButton.addEventListener('click', () => handleGuess(false));
  playAgainButton.addEventListener('click', resetGame);
  helpButton.addEventListener('click', () => {
    tipElement.classList.toggle('hidden');
    helpButton.textContent = tipElement.classList.contains('hidden')
      ? 'Need Help?'
      : 'Hide Help';
  });

  // Initialize game with shuffled array
  anagrams = shuffleArray([...originalAnagrams]);
  displayCurrentPair();
});
