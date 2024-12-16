/*
Santa has grown suspicious that one of his elves isn't playing fair. The elves are paid well to make toys but Santa thinks one of the elves is keeping some of the toys he has made (and probably selling them on the black market in one of Laplands dodgier neighbourhoods.)

Santa has written a script to recursively look over the data and find discrepancies. But Santa is not so great at coding and he has got bugs he can't resolve.

This code should:
  - Traverse through all elves.
  - Traverse toysShipped, summing up toy counts across regions and subregions.
  - Compare the aggregated counts with toysMade to determine discrepancies.
But it doesn't!

Your task: debug this code - there are two bugs to find! 

Stretch Goal

- Recursion is hard! Delete everything in index.js and start again from scratch. You don't have to do it the same way. Perhaps you can find a better way.

*/

// Function to find the elf who created more presents than they delivered
import { workshopData } from './data.js';

// Create elf cards on page load
function createElfCards() {
  const elfGrid = document.getElementById('elfGrid');

  workshopData.forEach((elf, index) => {
    const card = document.createElement('div');
    card.className = 'elf-card';
    card.id = `elf-${index}`;

    // Create image container for naughty banner
    const imageContainer = document.createElement('div');
    imageContainer.style.position = 'relative';
    imageContainer.style.overflow = 'hidden';

    const naughtyBanner = document.createElement('div');
    naughtyBanner.className = 'naughty-banner';
    naughtyBanner.textContent = 'NAUGHTY';
    imageContainer.appendChild(naughtyBanner);

    const image = document.createElement('img');
    // Map each elf to their exact image filename
    const imageFilename = {
      'Elf Tiberius III': 'Elf Tiberius III.png',
      'Elf Herbert Drinklater': 'Elf Herbert Drinklater.png',
      'Elf Kalvin Armadillo': 'Elf Kalvin Armadillo.png',
      'Elf Ernest Tinkerer': 'Elf Ernest Tinkerer.png',
    }[elf.name];
    image.src = `images/${imageFilename}`;
    image.alt = elf.name;
    image.className = 'elf-image';

    imageContainer.appendChild(image);

    const name = document.createElement('div');
    name.className = 'elf-name';
    name.textContent = elf.name;

    const toysMade = document.createElement('div');
    toysMade.className = 'toy-list';
    toysMade.innerHTML = '<strong>Toys Made:</strong>';

    Object.entries(elf.toysMade).forEach(([toy, count]) => {
      const toyItem = document.createElement('div');
      toyItem.className = 'toy-item';
      toyItem.innerHTML = `
                <span><i class="fas ${
                  toyIcons[toy] || 'fa-gift'
                }"></i>${toy}:</span>
                <span>${count}</span>
            `;
      toysMade.appendChild(toyItem);
    });

    const shippedToys = document.createElement('div');
    shippedToys.className = 'shipped-toys';
    shippedToys.innerHTML = '<strong>Toys Shipped:</strong>';

    card.appendChild(imageContainer);
    card.appendChild(name);
    card.appendChild(toysMade);
    card.appendChild(shippedToys);

    elfGrid.appendChild(card);
  });
}

// Add Font Awesome
const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href =
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
document.head.appendChild(fontAwesome);

// Toy icon mapping
const toyIcons = {
  'Teddy Bear': 'fa-paw',
  'Race Car': 'fa-car',
  Doll: 'fa-child',
  Puzzle: 'fa-puzzle-piece',
  Blocks: 'fa-cubes',
  Drone: 'fa-helicopter',
  Robot: 'fa-robot',
  'Board Game': 'fa-chess-board',
};

// Function to find naughty elves
function findNaughtyElves() {
  return workshopData.map((elf) => {
    const totalShipped = {};

    function sumToys(shipmentData) {
      for (const region in shipmentData) {
        const subRegion = shipmentData[region];
        if (Array.isArray(subRegion)) {
          subRegion.forEach(({ toy, count }) => {
            totalShipped[toy] = (totalShipped[toy] || 0) + count;
          });
        } else {
          sumToys(subRegion);
        }
      }
    }

    sumToys(elf.toysShipped);

    const isNaughty = Object.keys(elf.toysMade).some(
      (toy) => elf.toysMade[toy] > (totalShipped[toy] || 0)
    );

    return {
      name: elf.name,
      totalShipped,
      isNaughty,
    };
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  createElfCards();

  // Help Modal functionality
  const modal = document.getElementById('helpModal');
  const helpBtn = document.getElementById('helpButton');
  const closeBtn = document.querySelector('.close-button');

  helpBtn.onclick = function () {
    modal.style.display = 'block';
  };

  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  document.getElementById('checkButton').addEventListener('click', () => {
    const results = findNaughtyElves();

    results.forEach((result, index) => {
      const card = document.getElementById(`elf-${index}`);
      const shippedSection = card.querySelector('.shipped-toys');

      // Clear previous results
      shippedSection.innerHTML = '<strong>Toys Shipped:</strong>';

      // Add shipped toy counts
      Object.entries(result.totalShipped).forEach(([toy, count]) => {
        const toyItem = document.createElement('div');
        toyItem.className = 'toy-item';
        toyItem.innerHTML = `
                    <span><i class="fas ${
                      toyIcons[toy] || 'fa-gift'
                    }"></i>${toy}:</span>
                    <span>${count}</span>
                `;
        shippedSection.appendChild(toyItem);
      });

      // Show shipped section
      shippedSection.style.display = 'block';

      // Add naughty class if needed
      card.classList.toggle('naughty', result.isNaughty);
    });
  });
});
