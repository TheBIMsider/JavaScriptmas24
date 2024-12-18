/*
😱 Christmas can get expensive! 

You've been on a shopping trip and spent too much money. 
But how much of that can you blame on Christmas?

**Task**

- Calculate and return the total cost of only the gifts in the shopping cart.
- Each gift has the isGift boolean set to true.
- The total cost of gifts should be given to two decimal places.

Expected output: 559.93  

**Stretch Goal**

- Use the reduce() method to complete this challenge.
*/

import shoppingCartData from './data.js';

let currentItems = [...shoppingCartData];
let currentBudget = 600.0;

function calculateCost(items) {
  return items.reduce((total, item) => total + item.price, 0).toFixed(2);
}

function updateBudgetDisplay(giftTotal) {
  const budgetAmount = document.getElementById('budget-amount');
  const budgetMessage = document.getElementById('budget-message');
  const budgetRemaining = document.getElementById('budget-remaining');
  const budgetProgress = document.getElementById('budget-progress');

  const totalGifts = parseFloat(giftTotal);
  const remaining = currentBudget - totalGifts;
  const percentUsed = (totalGifts / currentBudget) * 100;

  budgetAmount.textContent = `Budget: $${currentBudget.toFixed(2)}`;
  budgetRemaining.textContent = `Remaining: $${remaining.toFixed(2)}`;

  budgetProgress.style.width = `${Math.min(percentUsed, 100)}%`;
  budgetProgress.classList.toggle('warning', percentUsed > 100);

  if (remaining < 0) {
    budgetMessage.className = 'budget-warning';
    budgetMessage.textContent = `⚠️ Over budget by $${Math.abs(
      remaining
    ).toFixed(2)}!`;
  } else if (remaining === 0) {
    budgetMessage.className = 'budget-warning';
    budgetMessage.textContent = `'⚠️ You've reached your budget limit!`;
  } else {
    budgetMessage.className = 'budget-ok';
    budgetMessage.textContent = `✅ Within budget`;
  }
}

function displayItems(filter = 'all') {
  const itemsList = document.getElementById('items-list');
  const totalElement = document.getElementById('total');

  itemsList.innerHTML = '';

  // Create the filtered display array but keep original indices
  let itemsToDisplay = currentItems.map((item, index) => ({
    ...item,
    originalIndex: index,
  }));

  if (filter === 'gifts') {
    itemsToDisplay = itemsToDisplay.filter((item) => item.isGift);
  } else if (filter === 'regular') {
    itemsToDisplay = itemsToDisplay.filter((item) => !item.isGift);
  }

  itemsToDisplay.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className = `item ${item.isGift ? 'gift' : ''}`;
    itemElement.innerHTML = `
            <div class="item-main">
                <span>${item.item} ${item.isGift ? '🎁' : '🛍️'}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
            <div class="item-controls">
                <button class="toggle-gift" data-index="${item.originalIndex}">
                    ${item.isGift ? 'Make Regular' : 'Make Gift'}
                </button>
                <button class="remove-item" data-index="${
                  item.originalIndex
                }">🗑️</button>
            </div>
        `;
    itemsList.appendChild(itemElement);
  });

  // Remove old event listeners
  document.querySelectorAll('.toggle-gift').forEach((button) => {
    button.replaceWith(button.cloneNode(true));
  });
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.replaceWith(button.cloneNode(true));
  });

  // Add new event listeners
  document.querySelectorAll('.toggle-gift').forEach((button) => {
    button.addEventListener('click', toggleGiftStatus);
  });
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', removeItem);
  });

  const total = calculateCost(itemsToDisplay);
  totalElement.textContent = `Total: $${total}`;

  const giftTotal = calculateCost(currentItems.filter((item) => item.isGift));
  updateBudgetDisplay(giftTotal);
}

function toggleGiftStatus(e) {
  const index = parseInt(e.target.dataset.index);
  const currentFilter = document.getElementById('filter-select').value;

  if (index >= 0 && index < currentItems.length) {
    currentItems[index].isGift = !currentItems[index].isGift;
    displayItems(currentFilter);
  }
}

function removeItem(e) {
  const index = parseInt(e.target.dataset.index);
  const currentFilter = document.getElementById('filter-select').value;

  if (index >= 0 && index < currentItems.length) {
    currentItems.splice(index, 1);
    displayItems(currentFilter);
  }
}

function addItem(e) {
  e.preventDefault();

  const newItem = {
    item: document.getElementById('item-name').value,
    price: parseFloat(document.getElementById('item-price').value),
    isGift: document.getElementById('is-gift').checked,
  };

  currentItems.push(newItem);
  e.target.reset();

  const currentFilter = document.getElementById('filter-select').value;
  displayItems(currentFilter);
}

// Event Listeners
document.getElementById('filter-select').addEventListener('change', (e) => {
  displayItems(e.target.value);
});

document.getElementById('add-item-form').addEventListener('submit', addItem);

document.getElementById('set-budget').addEventListener('click', () => {
  const budgetInput = document.getElementById('budget-input');
  const newBudget = parseFloat(budgetInput.value);
  if (!isNaN(newBudget) && newBudget > 0) {
    currentBudget = newBudget;
    displayItems(document.getElementById('filter-select').value);
  }
});

// Help modal functionality
const modal = document.getElementById('help-modal');
const helpBtn = document.getElementById('help-button');
const closeBtn = document.getElementsByClassName('close')[0];

helpBtn.onclick = function () {
  modal.style.display = 'block';
};

closeBtn.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Initial display
displayItems('all');
