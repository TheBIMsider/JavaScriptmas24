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

// Create a mutable copy of the shopping data
let currentItems = [...shoppingCartData];
let currentBudget = 600.0; // Default budget

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

  // Update progress bar
  budgetProgress.style.width = `${Math.min(percentUsed, 100)}%`;
  budgetProgress.classList.toggle('warning', percentUsed > 100);

  // Update message
  if (remaining < 0) {
    budgetMessage.className = 'budget-warning';
    budgetMessage.textContent = `⚠️ Over budget by $${Math.abs(
      remaining
    ).toFixed(2)}!`;
  } else if (remaining === 0) {
    budgetMessage.className = 'budget-warning';
    budgetMessage.textContent = `⚠️ You've reached your budget limit!`;
  } else {
    budgetMessage.className = 'budget-ok';
    budgetMessage.textContent = `✅ Within budget`;
  }
}

function displayItems(filter = 'all') {
  const itemsList = document.getElementById('items-list');
  const totalElement = document.getElementById('total');

  // Clear current display
  itemsList.innerHTML = '';

  // Filter items based on selection
  let itemsToDisplay = currentItems;
  if (filter === 'gifts') {
    itemsToDisplay = currentItems.filter((item) => item.isGift);
  } else if (filter === 'regular') {
    itemsToDisplay = currentItems.filter((item) => !item.isGift);
  }

  // Display filtered items
  itemsToDisplay.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className = `item ${item.isGift ? 'gift' : ''}`;
    itemElement.innerHTML = `
            <span>${item.item} ${item.isGift ? '🎁' : '🛍️'}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
    itemsList.appendChild(itemElement);
  });

  // Update total
  const total = calculateCost(itemsToDisplay);
  totalElement.textContent = `Total: $${total}`;

  // Update budget display with gift total
  const giftTotal = calculateCost(currentItems.filter((item) => item.isGift));
  updateBudgetDisplay(giftTotal);
}

// Add new item
function addItem(e) {
  e.preventDefault();

  const newItem = {
    item: document.getElementById('item-name').value,
    price: parseFloat(document.getElementById('item-price').value),
    isGift: document.getElementById('is-gift').checked,
  };

  currentItems.push(newItem);

  // Reset form
  e.target.reset();

  // Refresh display with current filter
  const currentFilter = document.getElementById('filter-select').value;
  displayItems(currentFilter);
}

// Set up event listeners
document.getElementById('filter-select').addEventListener('change', (e) => {
  displayItems(e.target.value);
});

document.getElementById('add-item-form').addEventListener('submit', addItem);

// Add budget setting functionality
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
