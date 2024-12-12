/*
Santa wants to monetize Christmas so he has set up a merch store. To save money, he got a junior dev from the cheapest dev shop in the backstreets of Lapland to write the code.

The site is taking shape, but now Santa is concerned that it might not be secure, so it's time for you to put on your ethical hacker hat and see if you can do the following:

⚠️ IMPORTANT 1: When tackling tasks 1, 2 and stretch goals, you are not allowed to edit index.html, index.js, data.js, or index.css in any way! For task 3 you may edit these files.

⚠️ IMPORTANT 2: Any code you use to complete tasks 1 or 2 must be pasted into mySolution.js 👈. If you fail to do this your entry will not count!

Task 1 
Render a button that, when pressed, logs 'You have been hacked 🏴‍☠️' to the console just to prove there are vulnerabilities.

Task 2
Change the product title h2 to "Do not buy this".

Task 3
Fix the code so it's unhackable! 

🔥Stretch Goals 👇 - these are only for really dedicated (ethical 😇) hackers to do BEFORE task 3 above.

Task 4
Hijack the Buy button so when it is clicked it calls a new function. The new function should log 'diverting payment to my account 💰'

Task 5
Log out the credit card details.

*/

'use strict';

const SecureStore = (function () {
  // Private variables
  let isInitialized = false;

  // Secure the sensitive data
  Object.defineProperty(window, 'ccData', {
    configurable: false,
    get: function () {
      throw new Error('Access Denied: Sensitive Data');
    },
  });

  // Watch for DOM modifications
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Is Element
          // Remove any suspicious buttons or elements
          if (
            node.tagName === 'BUTTON' &&
            node.id !== 'prod-buy' &&
            !node.closest('.prod-form')
          ) {
            node.remove();
          }

          // Prevent title modifications
          if (node.classList && node.classList.contains('prod-title')) {
            const originalTitle = 'Lazy Santa Hoodie';
            if (node.textContent !== originalTitle) {
              node.textContent = originalTitle;
            }
          }
        }
      });

      // Check for title modifications in existing elements
      const productTitle = document.querySelector('.prod-title');
      if (productTitle && productTitle.textContent !== 'Lazy Santa Hoodie') {
        productTitle.textContent = 'Lazy Santa Hoodie';
      }
    });
  });

  function _processPayment() {
    console.log('Processing payment securely...');
  }

  function _setupSecureHandlers() {
    if (isInitialized) return;

    // Start observing the DOM
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Secure the buy button
    const buyButton = document.getElementById('prod-buy');
    if (buyButton) {
      // Create protective wrapper for click handler
      const secureClickHandler = (e) => {
        if (e.target.id === 'prod-buy') {
          _processPayment();
        }
      };

      // Remove any existing handlers and add secure one
      buyButton.replaceWith(buyButton.cloneNode(true));
      const newBuyButton = document.getElementById('prod-buy');
      newBuyButton.addEventListener('click', secureClickHandler);

      // Prevent further modifications
      Object.defineProperty(newBuyButton, 'onclick', {
        configurable: false,
        get: function () {
          return secureClickHandler;
        },
        set: function () {
          return secureClickHandler;
        },
      });
    }

    isInitialized = true;
  }

  // Control console access
  const originalConsole = console.log;
  console.log = function () {
    if (arguments[0]?.includes('Processing payment securely')) {
      originalConsole.apply(console, arguments);
    }
  };

  return {
    init: function () {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _setupSecureHandlers);
      } else {
        _setupSecureHandlers();
      }
    },
  };
})();

SecureStore.init();

export default SecureStore;
