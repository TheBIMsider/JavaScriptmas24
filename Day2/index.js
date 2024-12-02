document.addEventListener('DOMContentLoaded', () => {
  const calendarContainer = document.getElementById('calendar');
  const resetButton = document.getElementById('resetCalendar');
  let openedDays = JSON.parse(localStorage.getItem('openedDays') || '[]');

  // Add reset functionality
  resetButton.addEventListener('click', () => {
    // Clear localStorage
    localStorage.removeItem('openedDays');
    openedDays = [];

    // Remove 'opened' class from all boxes
    document.querySelectorAll('.calendar-box').forEach((box) => {
      box.classList.remove('opened');
    });
  });

  // Array of winter/Christmas themed icons (Free Font Awesome icons only)
  const winterIcons = [
    'fa-gifts', // Gifts
    'fa-holly-berry', // Holly
    'fa-rocket', // Rocket
    'fa-guitar', // Guitar
    'fa-baseball', // Baseball
    'fa-cookie-bite', // Cookie
    'fa-football', // Football
    'fa-headphones', // Headphones
    'fa-tractor', // Tractor
    'fa-person-skiing', // Skiing
    'fa-puzzle-piece', // Puzzle
    'fa-sleigh', // Sleigh
    'fa-paper-plane', // Paper Plane
    'fa-snowman', // Snowman
    'fa-candy-cane', // Candy Cane
    'fa-dog', // Dog
    'fa-tree', // Christmas Tree
    'fa-camera', // Camera
    'fa-bicycle', // Bike
    'fa-drum', // Drum
    'fa-chess', // Chess
    'fa-robot', // Robot
    'fa-gamepad', // Crown
    'fa-desktop', // Computer
  ];

  function getRandomIcon(day) {
    // Use the day number to consistently get the same icon for each day
    return winterIcons[day % winterIcons.length];
  }

  function createCalendarBox(day) {
    const box = document.createElement('li');
    box.classList.add('calendar-box');
    if (openedDays.includes(day)) {
      box.classList.add('opened');
    }

    // Create front face
    const frontFace = document.createElement('div');
    frontFace.classList.add('calendar-box-face', 'calendar-box-front');

    // Create number element
    const number = document.createElement('p');
    number.classList.add('number');
    number.textContent = day;

    // Create icon element for front (always gift)
    const frontIcon = document.createElement('i');
    frontIcon.classList.add('fas', 'fa-gift');

    // Create description element
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = 'Open me!';

    // Append elements to front face
    frontFace.appendChild(number);
    frontFace.appendChild(frontIcon);
    frontFace.appendChild(description);

    // Create back face
    const backFace = document.createElement('div');
    backFace.classList.add('calendar-box-face', 'calendar-box-back');

    // Create surprise icon for back (different for each day)
    const surpriseIcon = document.createElement('i');
    surpriseIcon.classList.add('fas', getRandomIcon(day), 'large-snowflake');

    // Create opened text
    const openedText = document.createElement('p');
    openedText.classList.add('description');
    openedText.textContent = `Day ${day} Opened!`;

    // Append elements to back face
    backFace.appendChild(surpriseIcon);
    backFace.appendChild(openedText);

    // Add faces to box
    box.appendChild(frontFace);
    box.appendChild(backFace);

    // Add click handler
    box.addEventListener('click', () => {
      if (!openedDays.includes(day)) {
        openBox(box, day);
      }
    });

    return box;
  }

  function openBox(box, day) {
    // Add to opened days
    openedDays.push(day);
    localStorage.setItem('openedDays', JSON.stringify(openedDays));

    // Update box appearance
    box.classList.add('opened');
  }

  // Generate calendar boxes
  for (let i = 1; i <= 24; i++) {
    const box = createCalendarBox(i);
    calendarContainer.appendChild(box);
  }
});
