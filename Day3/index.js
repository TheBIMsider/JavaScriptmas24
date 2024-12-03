/*  Santas Emoji Hack!

During Christmas, Santa wants to ban negative emojis, so when people
use negative emoji shortcodes, he wants positive emojis to appear instead.

In other words, :angry: should result in 🎁 instead of 😠.

1. Write a function that checks if a lowercase word starts and 
ends with a colon. If it does, check if it exists in the hackedEmojis object, 
and replace it with the corresponding emoji. If not, return the original word.

Example input: ":cry:"
Example output: ‍😄

2. Write a function to find any emoji shortcodes in a phrase.
Use your emojify function from the previous exercise!

Example input: "Just read your article :thumbsdown:"
Example output: "Just read your article 👏"

Stretch goal: don't just replace the shortcodes, but also any emojis are added directly to the text.

*/
const hackedEmojis = {
  angry: '😎', // 😠
  thumbsdown: '👍', // 👎
  man_facepalming: '🎅', // 🤦‍♂️
  cry: '‍😄', // 😭
  puke: '🤩', // 🤮
  lying_face: '🤗', // 🤥
  angry_face_with_horns: '😸', // 👿
  poop: '🎁', // 💩
};

const directEmojiReplacements = {
  '😠': '😎',
  '👎': '👍',
  '🤦‍♂️': '🎅',
  '😭': '😄',
  '🤮': '🤩',
  '🤥': '🤗',
  '👿': '😸',
  '💩': '🎁',
};

function emojifyWord(word) {
  if (word.startsWith(':') && word.endsWith(':')) {
    const emojiName = word.slice(1, -1);
    return hackedEmojis[emojiName] || word;
  }

  let result = word;
  Object.entries(directEmojiReplacements).forEach(([negative, positive]) => {
    result = result.replace(new RegExp(negative, 'g'), positive);
  });

  return result;
}

function emojifyPhrase(phrase) {
  return phrase
    .split(' ')
    .map((word) => emojifyWord(word))
    .join(' ');
}

// DOM elements
const input = document.getElementById('emojiInput');
const output = document.getElementById('output');
const showMappingBtn = document.getElementById('showMappingBtn');
const emojiMapping = document.getElementById('emojiMapping');
const mappingGrid = document.querySelector('.mapping-grid');

// Input event handler
input.addEventListener('input', (e) => {
  const inputText = e.target.value;
  const convertedText = emojifyPhrase(inputText);
  output.textContent =
    convertedText || 'Your converted message will appear here';
});

// Create mapping display
function createMappingDisplay() {
  Object.entries(directEmojiReplacements).forEach(([negative, positive]) => {
    const mappingItem = document.createElement('div');
    mappingItem.className = 'mapping-item';
    mappingItem.textContent = `${negative} → ${positive}`;
    mappingGrid.appendChild(mappingItem);
  });
}

// Toggle mapping visibility
let isMappingVisible = false;
showMappingBtn.addEventListener('click', () => {
  isMappingVisible = !isMappingVisible;
  emojiMapping.classList.toggle('hidden');
  showMappingBtn.textContent = isMappingVisible
    ? 'Hide Emoji Mappings'
    : 'Show Emoji Mappings';

  // Create mapping display if it hasn't been created yet
  if (isMappingVisible && !mappingGrid.children.length) {
    createMappingDisplay();
  }
});

/*  Test cases for shortcodes
console.log(emojifyWord(':lying_face:')); // Expected: 🤗
console.log(emojifyWord(':angry:')); // Expected: 😎
console.log(emojifyWord(':smile:')); // Expected: :smile: (unchanged)
console.log(emojifyWord('hello')); // Expected: hello (unchanged)

console.log(emojifyPhrase('That score makes me :angry_face_with_horns:')); // Expected: That score makes me 😸
console.log(emojifyPhrase('Those shoes :puke:')); // Expected: Those shoes 🤩
console.log(emojifyPhrase('Just read your article :thumbsdown:')); // Expected: Just read your article 👍
console.log(emojifyPhrase('That made me :cry: of joy')); // Expected: That made me 😄 of joy

New test cases for direct emoji replacements
console.log(emojifyPhrase('I am so 😠 right now')); // Expected: I am so 😎 right now
console.log(emojifyPhrase('This deserves a 👎')); // Expected: This deserves a 👏
console.log(emojifyPhrase('That makes me 🤮')); // Expected: That makes me 🤩
console.log(emojifyPhrase('I am 😠 and 😭')); // Expected: I am 😎 and 😄

Mixed test cases
console.log(emojifyPhrase('I am :angry: and 😠')); // Expected: I am 😎 and 😎
console.log(emojifyPhrase('This deserves both 👎 and :thumbsdown:')); // Expected: This deserves both 👍 and 👍
*/
