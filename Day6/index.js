/* 
Challenge:
1. Write JavaScript to create a snowflake and make it fall inside the snow globe. The snowflake should have a random starting position, animation duration, and size.
2. See index.css
*/
/* Stretch goals: 
- Give some variety to your snowflakes, so they are not all the same. Perhaps every 25th one could be a snowman ☃️?
- Remove each snowflake after a set time - this will stop the scene from being lost in a blizzard!
- Add a button that makes the snow start falling, it could trigger a CSS-animated shake of the snow globe. Then make the snow become less frequent until it slowly stops - until the button is pressed again.  
- Change the direction of the snowflakes so they don’t all fall vertically.
- Make the style your own! 
*/

const snowGlobe = document.querySelector('.snow-globe');
const globeContainer = document.querySelector('.globe-container');
const gentleShakeButton = document.querySelector(
  '.shake-button:not(.shake-hard)'
);
const hardShakeButton = document.querySelector('.shake-button.shake-hard');
const stopButton = document.querySelector('.stop-button');
const changeItemButton = document.querySelector('.change-item');

let isShaking = false;
let snowfallInterval = null;
let isStopped = false;
let currentItemIndex = 0;

// Define falling item types with plural names
const itemTypes = [
  {
    name: 'Snowflakes', // Updated to plural
    symbols: ['❆', '❅', '❄'],
    className: 'snowflake',
  },
  {
    name: 'Christmas Candies', // Updated to plural
    symbols: ['🍬'],
    className: 'falling-item candy-cane',
  },
  {
    name: 'Snowmen', // Updated to plural
    symbols: ['⛄'],
    className: 'falling-item snowman',
  },
  {
    name: 'Gifts', // Updated to plural
    symbols: ['🎁'],
    className: 'falling-item gift',
  },
];

function createFallingItem(isHardShake = false) {
  if (isStopped) return;

  const itemType = itemTypes[currentItemIndex];
  const item = document.createElement('div');
  item.classList.add(...itemType.className.split(' '));

  const radius = 190;
  const angle = Math.random() * Math.PI;
  const maxX = Math.cos(angle) * radius;
  const startingX = Math.random() * (maxX * 2) - maxX + radius;

  const minSize = isHardShake ? 8 : 6;
  const maxSize = isHardShake ? 25 : 12;
  const size = Math.random() * (maxSize - minSize) + minSize;

  const minDuration = isHardShake ? 2 : 4;
  const maxDuration = isHardShake ? 5 : 8;
  const animationDuration =
    Math.random() * (maxDuration - minDuration) + minDuration;

  const opacity = Math.random() * (1 - 0.7) + 0.7;

  item.style.cssText = `
        left: ${startingX}px;
        font-size: ${size}px;
        opacity: ${opacity};
        animation-duration: ${animationDuration}s;
    `;

  const symbols = itemType.symbols;
  item.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

  const rotation = Math.random() * (isHardShake ? 720 : 360);
  const horizontalMovement = isHardShake ? (Math.random() - 0.5) * 50 : 0;

  item.animate(
    [
      { transform: `rotate(0deg) translateY(0) translateX(0)` },
      {
        transform: `rotate(${rotation}deg) translateY(360px) translateX(${horizontalMovement}px)`,
      },
    ],
    {
      duration: animationDuration * 1000,
      easing: 'ease-in',
      fill: 'forwards',
    }
  );

  snowGlobe.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, animationDuration * 1000);
}

function startFalling(intensity = 'normal') {
  if (isStopped) return;
  const interval = intensity === 'intense' ? 50 : 300;
  const isHardShake = intensity === 'intense';
  snowfallInterval = setInterval(
    () => createFallingItem(isHardShake),
    interval
  );
}

function stopFalling() {
  if (snowfallInterval) {
    clearInterval(snowfallInterval);
    snowfallInterval = null;
  }
}

function toggleStop() {
  isStopped = !isStopped;
  stopButton.classList.toggle('active');
  stopButton.textContent = isStopped ? 'Resume Falling' : 'Stop Falling';

  if (isStopped) {
    stopFalling();
  } else {
    startFalling('normal');
  }
}

function changeItem() {
  currentItemIndex = (currentItemIndex + 1) % itemTypes.length;
  const itemType = itemTypes[currentItemIndex];
  changeItemButton.textContent = `Current: ${itemType.name}`;
}

function shakeGlobe(isHard = false) {
  if (isShaking) return;

  isShaking = true;
  gentleShakeButton.disabled = true;
  hardShakeButton.disabled = true;

  globeContainer.classList.add(isHard ? 'shaking-hard' : 'shaking');

  stopFalling();
  if (!isStopped) {
    startFalling('intense');
  }

  const burstCount = isHard ? 25 : 15;
  for (let i = 0; i < burstCount; i++) {
    createFallingItem(isHard);
  }

  const shakeDuration = isHard ? 4000 : 3000;
  setTimeout(() => {
    globeContainer.classList.remove(isHard ? 'shaking-hard' : 'shaking');
    if (!isStopped) {
      startFalling('normal');
    }
    isShaking = false;
    gentleShakeButton.disabled = false;
    hardShakeButton.disabled = false;
  }, shakeDuration);
}

// Add event listeners
gentleShakeButton.addEventListener('click', () => shakeGlobe(false));
hardShakeButton.addEventListener('click', () => shakeGlobe(true));
stopButton.addEventListener('click', toggleStop);
changeItemButton.addEventListener('click', changeItem);

// Start with normal snowfall
if (!isStopped) {
  startFalling('normal');
}

// Set initial button text
changeItem(); // Initialize the change item button text
