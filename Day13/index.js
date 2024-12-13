// Santa needs your help to figure out if he has enough money to give everyone change!
// Your goal will be to return true if everyone gets their correct change, and false if at least one person does not receive their correct change! Use the function below to get started!

/* 
Some things to keep in mind!
- Santa will only accept, $5, $10, and $20 bills.
- You cannot split a bill in half, for example if someone pays with a $10, and you only have a $10. You will take their $10 and they will not get any change!
- Your goal will be to return a boolean. You should return True if everyone received their correct change, or False if at least one person did not.
*/

// Good luck and happy coding!!
function correctChangeFromSanta(bills) {
  let fives = 0;
  let tens = 0;

  for (let payment of bills) {
    if (payment === 5) {
      fives++;
      continue;
    }

    if (payment === 10) {
      if (fives === 0) return false;
      fives--;
      tens++;
      continue;
    }

    if (payment === 20) {
      if (tens >= 1 && fives >= 1) {
        tens--;
        fives--;
      } else if (fives >= 3) {
        fives -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
}

// Function to create the SVG animation
function createChristmasAnimation(isSuccess) {
  return `
      <div class="${
        isSuccess ? 'bounce' : 'pulse'
      }" style="text-align: center;">
          <svg width="100" height="100" viewBox="0 0 100 100">
              <!-- Present box -->
              <rect x="20" y="40" width="60" height="50" fill="${
                isSuccess ? '#ff4444' : '#8b0000'
              }" />
              <!-- Present lid -->
              <rect x="15" y="30" width="70" height="15" fill="${
                isSuccess ? '#cc0000' : '#660000'
              }" />
              <!-- Ribbon vertical -->
              <rect x="45" y="40" width="10" height="50" fill="${
                isSuccess ? '#ffdd00' : '#cc9900'
              }" />
              <!-- Ribbon horizontal -->
              <rect x="20" y="55" width="60" height="10" fill="${
                isSuccess ? '#ffdd00' : '#cc9900'
              }" />
              <!-- Face -->
              <path d="${
                isSuccess ? 'M40 55 Q50 65 60 55' : 'M40 65 Q50 55 60 65'
              }" 
                    stroke="#ffffff" stroke-width="3" fill="none" />
              <circle cx="35" cy="45" r="3" fill="#ffffff" />
              <circle cx="65" cy="45" r="3" fill="#ffffff" />
          </svg>
      </div>
  `;
}

// Add styles for animations
const style = document.createElement('style');
style.textContent = `
  .bounce {
      animation: bounce 1s infinite;
  }
  
  .pulse {
      animation: pulse 2s infinite;
  }
  
  @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(0.95); }
  }
`;
document.head.appendChild(style);

function checkPayments() {
  const input = document.getElementById('paymentInput').value;
  const resultDiv = document.getElementById('result');
  const payments = input.split(',').map((num) => parseInt(num.trim()));

  if (payments.some(isNaN)) {
    resultDiv.textContent = 'Please enter valid numbers separated by commas';
    resultDiv.classList.add('has-result');
    document.getElementById('animationContainer').innerHTML = '';
    return;
  }

  const result = correctChangeFromSanta(payments);
  resultDiv.textContent = result
    ? 'Nice job Santa, everyone got their correct change!'
    : 'Looks like you have some work to do Santa, and bring some money next time!';
  resultDiv.classList.add('has-result');

  // Add the animation
  document.getElementById('animationContainer').innerHTML =
    createChristmasAnimation(result);
}

// Add event listeners when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the input and button elements
  const input = document.getElementById('paymentInput');
  const button = document.querySelector('button');

  // Get modal elements
  const modal = document.getElementById('helpModal');
  const helpBtn = document.getElementById('helpButton');
  const closeBtn = document.querySelector('.close-button');

  // Add click event listener to the button
  button.addEventListener('click', checkPayments);

  // Add keypress event listener to the input field
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      checkPayments();
    }
  });

  // Open modal when help button is clicked
  helpBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  // Close modal when X is clicked
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

window.runTestCase1 = function () {
  document.getElementById('paymentInput').value = '5,5,5,10,20';
  checkPayments();
};

window.runTestCase2 = function () {
  document.getElementById('paymentInput').value = '5,5,10,10,20';
  checkPayments();
};

// Original test cases
if (correctChangeFromSanta([5, 5, 5, 10, 20])) {
  console.log('Nice job Santa, everyone got their correct change!');
} else {
  console.log(
    'Looks like you have some work to do Santa, and bring some money next time!'
  );
}

if (correctChangeFromSanta([5, 5, 10, 10, 20])) {
  console.log('Nice job Santa, everyone got their correct change!');
} else {
  console.log(
    'Looks like you have some work to do Santa, and bring some money next time!'
  );
}
