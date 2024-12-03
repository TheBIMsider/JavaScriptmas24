/*

JavaScriptmas 2024 Day 1 - Grandpa's Gift List
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.

**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
  - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
  - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words. 

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.getElementById('shopping-list');
const listArr = [];

// Function to normalize text for comparison (not display)
function normalizeText(text) {
  return text.trim().replace(/\s+/g, ' ').toLowerCase();
}

// Function to check item is not duplicate
function checkDuplicate() {
  const itemText = itemInput.value;

  // Don't add empty items
  if (!itemText.trim()) {
    return;
  }

  // Normalize the new item text for comparison
  const normalizedNewItem = normalizeText(itemText);

  // Check if normalized version already exists in list
  const isDuplicate = listArr.some(
    (item) => normalizeText(item) === normalizedNewItem
  );

  // Only add if it's not a duplicate
  if (!isDuplicate) {
    // Store the original text with just outer whitespace trimmed
    listArr.push(itemText.trim());
    renderList();
  } else {
    const existingItem = listArr.find(
      (item) => normalizeText(item) === normalizedNewItem
    );
    alert(`This item is already on your list as "${existingItem}"!`);
  }
}

// Function to delete an item
function deleteItem(index) {
  listArr.splice(index, 1);
  renderList();
}

// Function to start editing an item
function startEditing(index, listItem) {
  const gift = listArr[index];
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = gift;
  editInput.className = 'edit-input';

  // Create save button
  const saveBtn = document.createElement('button');
  saveBtn.textContent = '✓';
  saveBtn.className = 'save-btn';

  // Create cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = '✗';
  cancelBtn.className = 'cancel-btn';

  // Clear the list item and add edit controls
  listItem.textContent = '';
  listItem.appendChild(editInput);
  listItem.appendChild(saveBtn);
  listItem.appendChild(cancelBtn);

  // Focus the input
  editInput.focus();

  // Save button handler
  saveBtn.onclick = () => saveEdit(index, editInput.value, listItem);

  // Cancel button handler
  cancelBtn.onclick = () => {
    renderList();
  };

  // Handle Enter key
  editInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
      saveEdit(index, editInput.value, listItem);
    }
  };
}

// Function to save an edit
function saveEdit(index, newValue, listItem) {
  // Don't save empty values
  if (!newValue.trim()) {
    renderList();
    return;
  }

  // Check if the edit would create a duplicate
  const normalizedNew = normalizeText(newValue);
  const isDuplicate = listArr.some(
    (item, i) => i !== index && normalizeText(item) === normalizedNew
  );

  if (isDuplicate) {
    const existingItem = listArr.find(
      (item, i) => i !== index && normalizeText(item) === normalizedNew
    );
    alert(`This item is already on your list as "${existingItem}"!`);
    renderList();
    return;
  }

  // Save the edit and re-render
  listArr[index] = newValue.trim();
  renderList();
}

// Function to render the shopping list
function renderList() {
  shoppingList.innerHTML = '';
  listArr.forEach((gift, index) => {
    const listItem = document.createElement('li');

    // Create text span to hold the gift emoji and gift name
    const textSpan = document.createElement('span');
    textSpan.textContent = `🎁 ${gift}`;
    textSpan.className = 'gift-text';
    listItem.appendChild(textSpan);

    // Create icons container
    const iconsSpan = document.createElement('span');
    iconsSpan.className = 'icons-container';

    // Create edit button
    const editBtn = document.createElement('span');
    editBtn.textContent = '✎';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => startEditing(index, listItem);

    // Create delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteItem(index);

    // Add buttons to icons container
    iconsSpan.appendChild(editBtn);
    iconsSpan.appendChild(deleteBtn);

    // Add icons container to list item
    listItem.appendChild(iconsSpan);

    shoppingList.appendChild(listItem);
  });
  itemInput.value = ''; // Clear the input field
}

// Add event listeners
addItemButton.addEventListener('click', checkDuplicate);

itemInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    checkDuplicate();
  }
});
