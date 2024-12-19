/*
    You're shopping for holiday gifts, but money is tight
    so we need to consider the cheapest items first.
    Use JavaScript's built-in array sort() (or toSorted()) method to
    write a function that returns an array of products sorted 
    by price, cheapest to most expensive. 
    
    Log the sorted array to the console to double-check you
    solved it correctly.
*/

/*
 * Stretch goals:
 *
 * 1. Log the items to the console in a more formatted way,
 *    like this (one item per line):
 *
 *    💕: $0
 *    🍬: $0.49
 *    🍫: $0.99
 *    🍭: $1.99
 *    🧁: $2.99
 *    ...etc.
 *
 * 2. Create a UI for this by displaying the unsorted items first, then
 *    having a button that will sort the items on the page by price.
 */

// Initial shopping list data
const defaultItems = [
  {
    product: '🍭',
    name: 'Candy',
    price: 1.99,
  },
  {
    product: '🍫',
    name: 'Chocolate',
    price: 0.99,
  },
  {
    product: '🏡',
    name: 'House',
    price: 700000,
  },
  {
    product: '🧁',
    name: 'Cupcake',
    price: 2.99,
  },
  {
    product: '📚',
    name: 'Books',
    price: 3.99,
  },
  {
    product: '⏰',
    name: 'Clock',
    price: 13.99,
  },
  {
    product: '🍬',
    name: 'Sweet',
    price: 0.49,
  },
  {
    product: '🥎',
    name: 'Ball',
    price: 3.99,
  },
  {
    product: '🎸',
    name: 'Guitar',
    price: 449.99,
  },
  {
    product: '🎨',
    name: 'Art Set',
    price: 23.99,
  },
  {
    product: '💕',
    name: 'Love',
    price: 0,
  },
];

// DOM elements
const shoppingListEl = document.getElementById('shoppingList');
const sortBtn = document.getElementById('sortBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const sortSelect = document.getElementById('sortSelect');
const addBtn = document.getElementById('addBtn');
const emojiInput = document.getElementById('emojiInput');
const nameInput = document.getElementById('nameInput');
const priceInput = document.getElementById('priceInput');
const emojiPicker = document.getElementById('emojiPicker');
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeModal = document.getElementById('closeModal');

// Default emoji for items
const DEFAULT_EMOJI = '🎁';

// Available emojis for the picker
const availableEmojis = [
  '🎁',
  '🍭',
  '🍫',
  '🏡',
  '🧁',
  '📚',
  '⏰',
  '🍬',
  '🥎',
  '🎸',
  '🎨',
  '💕',
  '🎄',
  '🎅',
  '⭐',
  '🕯️',
  '🧦',
  '🍪',
  '🦌',
  '❄️',
  '☃️',
  '🎍',
];

// Initialize emoji picker
function initializeEmojiPicker() {
  emojiPicker.innerHTML = `
      <div class="emoji-picker-header">
          Click to select or use your emoji keyboard<br>
          <small>(Windows: Win + . | Mac: Cmd + Ctrl + Space)</small>
      </div>
      <div class="emoji-grid">
          ${availableEmojis
            .map(
              (emoji) => `
              <div class="emoji-option">${emoji}</div>
          `
            )
            .join('')}
      </div>
  `;

  // Add click handlers for emoji options
  emojiPicker.querySelectorAll('.emoji-option').forEach((option) => {
    option.addEventListener('click', () => {
      emojiInput.value = option.textContent.trim();
      emojiPicker.classList.add('hidden');
    });
  });
}

// Initialize shopping list with default items
let shoppingList = [...defaultItems];

// Helper function to shuffle array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to render the shopping list
function renderList(items) {
  shoppingListEl.innerHTML = '';
  items.forEach((item, index) => {
    const itemCard = document.createElement('div');
    itemCard.className = 'item-card';
    itemCard.innerHTML = `
          <div class="product-info">
              <span class="product">${item.product}</span>
              <span class="name">${item.name}</span>
          </div>
          <div class="price-actions">
              <span class="price">$${item.price.toFixed(2)}</span>
              <button class="delete-btn" data-index="${index}">Remove</button>
          </div>
      `;
    shoppingListEl.appendChild(itemCard);
  });
}

// Add new item
function addItem() {
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const emojiValue = emojiInput.value.trim();
  const product = emojiValue || DEFAULT_EMOJI;

  if (!name || isNaN(price)) {
    alert('Please fill in at least the name and price');
    return;
  }

  const newItem = {
    product,
    name,
    price,
  };

  shoppingList.push(newItem);
  renderList(shoppingList);

  // Clear inputs
  emojiInput.value = '';
  nameInput.value = '';
  priceInput.value = '';
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains('delete-btn')) {
    const index = parseInt(e.target.dataset.index);
    shoppingList = shoppingList.filter((_, i) => i !== index);
    renderList(shoppingList);
  }
}

// Sorting functions
const sortingStrategies = {
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  nameAsc: (a, b) => a.name.localeCompare(b.name),
  nameDesc: (a, b) => b.name.localeCompare(a.name),
};

// Sort items based on selected option
function sortItems() {
  const sortStrategy = sortingStrategies[sortSelect.value];
  shoppingList = [...shoppingList].sort(sortStrategy);
  renderList(shoppingList);
}

// Shuffle items randomly
function shuffleItems() {
  shoppingList = shuffleArray(shoppingList);
  renderList(shoppingList);
}

// Event Listeners
// Toggle emoji picker
emojiInput.addEventListener('click', () => {
  emojiPicker.classList.toggle('hidden');
});

// Close emoji picker when clicking outside
document.addEventListener('click', (e) => {
  if (!emojiInput.contains(e.target) && !emojiPicker.contains(e.target)) {
    emojiPicker.classList.add('hidden');
  }
});

// Help modal
helpBtn.addEventListener('click', () => {
  helpModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  helpModal.classList.add('hidden');
});

// Close modal when clicking outside
helpModal.addEventListener('click', (e) => {
  if (e.target === helpModal) {
    helpModal.classList.add('hidden');
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !helpModal.classList.contains('hidden')) {
    helpModal.classList.add('hidden');
  }
});

// Main functionality buttons
sortBtn.addEventListener('click', sortItems);
shuffleBtn.addEventListener('click', shuffleItems);
addBtn.addEventListener('click', addItem);
shoppingListEl.addEventListener('click', removeItem);

// Initialize emoji picker and render initial list
initializeEmojiPicker();
renderList(shoppingList);
