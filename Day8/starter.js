export let guessArr = [];

export function renderGuess(guessContainer) {
  // Create individual boxes for each character
  const guessHtml = guessArr
    .map((char) => {
      return `<div class="guess-box">${char}</div>`;
    })
    .join('');

  // Wrap boxes in the guess-word container
  guessContainer.innerHTML = `
        <div class="guess-word">
            ${guessHtml}
        </div>
    `;
}

export function start(word) {
  guessArr = []; // Reset array
  for (let i = 0; i < word.length; i++) {
    guessArr.push('-');
  }
  return guessArr;
}
