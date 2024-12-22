/*
The run up to Christmas is quite a data-intensive time for Santa. In order to understand market trends, Santa's Data Elves have collated sample children’s wish list data from 4 locations and now need to know which was the most popular toy requested overall. This will help with procurement for next year. 

**Task**
- Your task is to find the most requested toy from the array of objects “toysRequested”. But remember: some toys appear in more than one location!

Expected output: "The most popular toy is 🎲 board games with 9000 requests.""

**Stretch Goal**
- Complete this challenge using the .flatMap() method to work with the various "toys" arrays.

*/

import { toysRequested } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Help Modal Functionality
  const modal = document.getElementById('helpModal');
  const helpBtn = document.getElementById('helpBtn');
  const closeBtn = document.getElementById('closeModal');

  helpBtn.addEventListener('click', () => {
    modal.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('show');
    }
  });

  // Prevent modal close when clicking inside modal content
  modal.querySelector('.modal-content').addEventListener('click', (event) => {
    event.stopPropagation();
  });

  // Dashboard Functionality
  const viewMode = document.getElementById('viewMode');
  const sortOrder = document.getElementById('sortOrder');
  const mainContent = document.getElementById('mainContent');
  const topToy = document.getElementById('topToy');
  const totalRequests = document.getElementById('totalRequests');

  // Helper function to get category (emoji) from toy name
  const getCategory = (toyName) => toyName.split(' ')[0];

  // Calculate global toy totals
  const toyTotals = toysRequested
    .flatMap((location) => location.toys)
    .reduce((totals, toyObj) => {
      const [toyName, quantity] = Object.entries(toyObj)[0];
      totals[toyName] = (totals[toyName] || 0) + quantity;
      return totals;
    }, {});

  // Find most popular toy
  const mostPopular = Object.entries(toyTotals).reduce(
    (max, [toy, count]) => (count > max.count ? { toy, count } : max),
    { toy: '', count: 0 }
  );

  // Calculate total requests
  const grandTotal = Object.values(toyTotals).reduce(
    (sum, count) => sum + count,
    0
  );

  // Update summary stats
  topToy.innerHTML = `
        <div class="toy-card">
            <span class="toy-emoji">${mostPopular.toy.split(' ')[0]}</span>
            <span class="toy-name">${mostPopular.toy
              .split(' ')
              .slice(1)
              .join(' ')}</span>
            <span class="toy-quantity">${mostPopular.count.toLocaleString()}</span>
        </div>
    `;
  totalRequests.textContent = grandTotal.toLocaleString();

  // Sort function based on sort type
  const sortToys = (toys, sortType) => {
    if (Array.isArray(toys)) {
      // For array of toy objects
      return [...toys].sort((a, b) => {
        const [nameA, quantityA] = Object.entries(a)[0];
        const [nameB, quantityB] = Object.entries(b)[0];

        switch (sortType) {
          case 'quantity':
            return quantityB - quantityA;
          case 'category':
            const categoryA = getCategory(nameA);
            const categoryB = getCategory(nameB);
            return categoryA === categoryB
              ? nameA.localeCompare(nameB)
              : categoryA.localeCompare(categoryB);
          default: // alphabetical
            return nameA.localeCompare(nameB);
        }
      });
    } else {
      // For object entries [toyName, quantity]
      return Object.entries(toys).sort((a, b) => {
        switch (sortType) {
          case 'quantity':
            return b[1] - a[1];
          case 'category':
            const categoryA = getCategory(a[0]);
            const categoryB = getCategory(b[0]);
            return categoryA === categoryB
              ? a[0].localeCompare(b[0])
              : categoryA.localeCompare(categoryB);
          default: // alphabetical
            return a[0].localeCompare(b[0]);
        }
      });
    }
  };

  function renderGlobalView(sortType) {
    const sortedToys = sortToys(toyTotals, sortType);

    let currentCategory = '';
    let html = '';

    sortedToys.forEach(([toy, quantity]) => {
      const category = getCategory(toy);

      if (sortType === 'category' && category !== currentCategory) {
        if (currentCategory !== '') {
          html += '</div>';
        }
        html += `
                    <div class="category-section">
                        <h3 class="category-header">${category}</h3>
                `;
        currentCategory = category;
      }

      html += `
                <div class="toy-card">
                    <span class="toy-emoji">${category}</span>
                    <span class="toy-name">${toy
                      .split(' ')
                      .slice(1)
                      .join(' ')}</span>
                    <span class="toy-quantity">${quantity.toLocaleString()}</span>
                </div>
            `;
    });

    if (sortType === 'category') {
      html += '</div>';
    }

    mainContent.innerHTML = html;
  }

  function renderRegionalView(sortType) {
    let html = '';

    toysRequested.forEach((location) => {
      const sortedToys = sortToys(location.toys, sortType);
      let currentCategory = '';

      html += `<div class="region-section">
                <h2 class="region-header">${
                  location.location
                } (${location.amount.toLocaleString()} total)</h2>`;

      if (sortType === 'category') {
        sortedToys.forEach((toy) => {
          const [name, quantity] = Object.entries(toy)[0];
          const category = getCategory(name);

          if (category !== currentCategory) {
            if (currentCategory !== '') {
              html += '</div>';
            }
            html += `
                            <div class="category-section">
                                <h3 class="category-header">${category}</h3>
                        `;
            currentCategory = category;
          }

          html += `
                        <div class="toy-card">
                            <span class="toy-emoji">${category}</span>
                            <span class="toy-name">${name
                              .split(' ')
                              .slice(1)
                              .join(' ')}</span>
                            <span class="toy-quantity">${quantity.toLocaleString()}</span>
                        </div>
                    `;
        });

        if (currentCategory !== '') {
          html += '</div>';
        }
      } else {
        sortedToys.forEach((toy) => {
          const [name, quantity] = Object.entries(toy)[0];
          html += `
                        <div class="toy-card">
                            <span class="toy-emoji">${getCategory(name)}</span>
                            <span class="toy-name">${name
                              .split(' ')
                              .slice(1)
                              .join(' ')}</span>
                            <span class="toy-quantity">${quantity.toLocaleString()}</span>
                        </div>
                    `;
        });
      }

      html += '</div>';
    });

    mainContent.innerHTML = html;
  }

  function renderCategoryView(sortType) {
    // Group toys by category (emoji)
    const categories = toysRequested
      .flatMap((location) => location.toys)
      .reduce((cats, toyObj) => {
        const [name, quantity] = Object.entries(toyObj)[0];
        const category = getCategory(name);
        if (!cats[category]) {
          cats[category] = { total: 0, toys: {} };
        }
        cats[category].toys[name] = (cats[category].toys[name] || 0) + quantity;
        cats[category].total += quantity;
        return cats;
      }, {});

    let sortedCategories = Object.entries(categories);
    if (sortType === 'quantity') {
      sortedCategories.sort((a, b) => b[1].total - a[1].total);
    } else if (sortType === 'category' || sortType === 'alphabetical') {
      sortedCategories.sort((a, b) => a[0].localeCompare(b[0]));
    }

    mainContent.innerHTML = sortedCategories
      .map(
        ([category, data]) => `
            <div class="category-section">
                <h2 class="category-header">${category} (${data.total.toLocaleString()} total)</h2>
                ${Object.entries(data.toys)
                  .sort((a, b) =>
                    sortType === 'quantity'
                      ? b[1] - a[1]
                      : a[0].localeCompare(b[0])
                  )
                  .map(
                    ([toy, quantity]) => `
                        <div class="toy-card">
                            <span class="toy-emoji">${category}</span>
                            <span class="toy-name">${toy
                              .split(' ')
                              .slice(1)
                              .join(' ')}</span>
                            <span class="toy-quantity">${quantity.toLocaleString()}</span>
                        </div>
                    `
                  )
                  .join('')}
            </div>
        `
      )
      .join('');
  }

  function updateView() {
    const currentView = viewMode.value;
    const currentSort = sortOrder.value;

    switch (currentView) {
      case 'global':
        renderGlobalView(currentSort);
        break;
      case 'regional':
        renderRegionalView(currentSort);
        break;
      case 'category':
        renderCategoryView(currentSort);
        break;
    }
  }

  // Event listeners for filters
  viewMode.addEventListener('change', updateView);
  sortOrder.addEventListener('change', updateView);

  // Initial render
  updateView();
});
