/*
Writing out labels by hand is a real pain. Luckily, you are so organised that you have all of your contacts saved in an array.

But not all of your contacts are on your Christmas list. So your task is this:

** Task ** 
1. Render a label for each entry in the address book, but only if isOnChistmasList is set to true! The label should contain the recipient's name and address.
2. Decorate the label with two festive icons from the icons folder. Use whatever colour scheme and layout you think looks good! 

** Stretch goals **
1. Ensure that the label does not get two of the same icon.
2. Create your own CSS Christmas logo to add a personal touch to each label.
*/

import { addresses } from './addresses.js';
import html2canvas from 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.js';

const labelsContainer = document.querySelector('.labels-container');
const nameSelect = document.getElementById('name-select');
const message = document.getElementById('message');
const toggleListBtn = document.getElementById('toggle-list-btn');
const printBtn = document.getElementById('print-btn');
const helpBtn = document.getElementById('help-btn');
const helpModal = document.getElementById('help-modal');
const closeBtn = document.querySelector('.close');
const christmasIcons = ['🎄', '🎅', '⛄', '🎁', '🔔', '❄️', '🕯️', '🦌'];

// Create a working copy of the addresses array that we can modify
let workingAddresses = [...addresses];

function getRandomIcons() {
  const shuffled = [...christmasIcons].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

async function downloadLabel(labelElement, contactName) {
  try {
    const canvas = await html2canvas(labelElement, {
      scale: 2, // Higher quality
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = `christmas-label-${contactName
      .toLowerCase()
      .replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error generating label image:', error);
    displayMessage('Error generating label image', 'error');
  }
}

function createLabel(contact) {
  // Create wrapper div to hold both label and download button
  const wrapper = document.createElement('div');
  wrapper.className = 'label-wrapper';

  const label = document.createElement('div');
  label.className = 'label';

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'btn download no-print';
  downloadBtn.textContent = 'Download';

  const [icon1, icon2] = getRandomIcons();

  label.innerHTML = `
        <span class="icon-top">${icon1}</span>
        <div class="label-content">
            <div class="recipient-name">${contact.name}</div>
            <div class="address">
                ${contact['address line 1']}<br>
                ${contact.town}<br>
                ${contact.state}<br>
                ${contact.country}
            </div>
        </div>
        <div class="christmas-logo">
            <div class="tree">
                <div class="star"></div>
                <div class="ornament ornament-1"></div>
                <div class="ornament ornament-2"></div>
                <div class="ornament ornament-3"></div>
                <div class="ornament ornament-4"></div>
                <div class="trunk"></div>
            </div>
        </div>
        <span class="icon-bottom">${icon2}</span>
    `;

  // Add download button event listener
  downloadBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    downloadLabel(label, contact.name);
  });

  // Add elements to wrapper
  wrapper.appendChild(downloadBtn);
  wrapper.appendChild(label);

  return wrapper;
}

function updateToggleButton(contact) {
  if (!contact) {
    toggleListBtn.style.display = 'none';
    return;
  }

  toggleListBtn.style.display = 'inline-block';
  if (contact.isOnChristmasList) {
    toggleListBtn.textContent = 'Remove from Christmas List';
    toggleListBtn.className = 'btn remove';
  } else {
    toggleListBtn.textContent = 'Add to Christmas List';
    toggleListBtn.className = 'btn add';
  }
}

function displayMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
  setTimeout(() => {
    message.textContent = '';
    message.className = 'message';
  }, 3000);
}

function updateDisplay(contact) {
  labelsContainer.innerHTML = '';

  if (!contact) return;

  if (contact.isOnChristmasList) {
    const wrapper = createLabel(contact);
    labelsContainer.appendChild(wrapper);
  }

  updateToggleButton(contact);
}

// Populate select dropdown
function populateSelect() {
  // Clear existing options except the first one
  while (nameSelect.options.length > 1) {
    nameSelect.remove(1);
  }

  // Add all contacts
  workingAddresses
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((contact) => {
      const option = document.createElement('option');
      option.value = contact.name;
      option.textContent = contact.name;
      nameSelect.appendChild(option);
    });
}

// Initial population
populateSelect();

// Handle selection changes
nameSelect.addEventListener('change', (e) => {
  const selectedName = e.target.value;
  const selectedContact = workingAddresses.find(
    (contact) => contact.name === selectedName
  );

  updateDisplay(selectedContact);

  if (selectedContact && !selectedContact.isOnChristmasList) {
    displayMessage(
      `${selectedContact.name} is not on the Christmas list!`,
      'error'
    );
  }
});

// Handle toggle button clicks
toggleListBtn.addEventListener('click', () => {
  const selectedName = nameSelect.value;
  const contactIndex = workingAddresses.findIndex(
    (contact) => contact.name === selectedName
  );

  if (contactIndex === -1) return;

  // Toggle the status
  workingAddresses[contactIndex] = {
    ...workingAddresses[contactIndex],
    isOnChristmasList: !workingAddresses[contactIndex].isOnChristmasList,
  };

  const contact = workingAddresses[contactIndex];
  updateDisplay(contact);

  // Show success message
  const action = contact.isOnChristmasList ? 'added to' : 'removed from';
  displayMessage(
    `${contact.name} has been ${action} the Christmas list!`,
    'success'
  );
});

// Add print button event listener
printBtn.addEventListener('click', () => {
  window.print();
});

// Help modal functionality
helpBtn.addEventListener('click', () => {
  helpModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  helpModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === helpModal) {
    helpModal.style.display = 'none';
  }
});

// Close modal with Escape key
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && helpModal.style.display === 'block') {
    helpModal.style.display = 'none';
  }
});
