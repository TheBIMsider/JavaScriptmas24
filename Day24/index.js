/*
codedMessage.js holds a coded message (well, the name makes it obvious, huh?).

**Task**
- Decode the message!

key.md will help!

**Stretch Goal**
No stretch goal for the final day. Just stretch your legs!
*/

import { codedMessage } from './codedMessage.js';

// Initialize the messages
const binaryMessage = codedMessage.join(' ');
const rawAsciiChars = codedMessage
  .map((binary) => String.fromCharCode(parseInt(binary, 2)))
  .join('');
const decodedMessage = codedMessage
  .map((binary) => {
    let ascii = parseInt(binary, 2) - 10;
    if (ascii < 32) {
      ascii = 128 - (32 - ascii);
    }
    return String.fromCharCode(ascii);
  })
  .join('');

// Set initial state
document.querySelector('#binary .message').textContent = binaryMessage;

// Modal handling
function setupModal(modalId, btnId) {
  const modal = document.getElementById(modalId);
  const btn = document.getElementById(btnId);
  const span = modal.querySelector('.close');

  btn.onclick = () => {
    modal.style.display = 'block';
  };

  span.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

// Setup both modals
setupModal('helpModal', 'helpBtn');
setupModal('keyModal', 'keyBtn');

// Button Event Listeners
document.getElementById('toAscii').addEventListener('click', () => {
  document.getElementById('binary').classList.remove('active');
  document.getElementById('binary').classList.add('inactive');
  document.getElementById('ascii').classList.remove('inactive');
  document.getElementById('ascii').classList.add('active');
  document.querySelector('#ascii .message').textContent = rawAsciiChars;
});

function celebrate() {
  // First burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, 250);

  // Final burst
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, 500);
}

document.getElementById('toDecode').addEventListener('click', () => {
  document.getElementById('ascii').classList.remove('active');
  document.getElementById('ascii').classList.add('inactive');
  document.getElementById('substituted').classList.remove('inactive');
  document.getElementById('substituted').classList.add('active');
  document.querySelector('#substituted .message').textContent = decodedMessage;

  // Trigger celebration
  celebrate();
});

document.getElementById('reset').addEventListener('click', () => {
  // Reset all steps to initial state
  document.querySelectorAll('.step').forEach((step) => {
    step.classList.remove('active', 'inactive');
  });

  // Reset first step to active
  document.getElementById('binary').classList.add('active');

  // Reset other steps
  document.getElementById('ascii').classList.add('inactive');
  document.getElementById('substituted').classList.add('inactive');

  // Add these two lines right here, before the closing bracket
  document.querySelector('#ascii .message').textContent = '';
  document.querySelector('#substituted .message').textContent = '';
});
