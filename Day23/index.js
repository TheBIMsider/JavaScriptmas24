/*
Santa has been hacked! In the list of kids to deliver to, the Grinch has replaced some kids' names with his own name.

The original array looked like this: 
['James', 'Yi', 'Florinda', 'Fatima', 'Tariq', 'Jose', 'Clare', 'Gibbs']

**Task** 
Remove 'Grinch' from santasArr and put the missing kids back in their original places!

**Stretch goal**
- Do this without creating a new array and using no array methods other than .forEach().
*/

const santasArr = [
  'James',
  'Yi',
  'Grinch',
  'Fatima',
  'Tariq',
  'Grinch',
  'Clare',
  'Grinch',
];
const missingNamesArr = ['Florinda', 'Jose', 'Gibbs'];
let currentFixIndex = 0;

const nameList = document.getElementById('nameList');
const fixButton = document.getElementById('fixButton');
const helpIcon = document.getElementById('helpIcon');
const helpPopup = document.getElementById('helpPopup');

function renderList() {
  nameList.innerHTML = '';
  santasArr.forEach((name) => {
    const div = document.createElement('div');
    div.textContent = name;
    div.className = `name-item ${name === 'Grinch' ? 'grinch' : 'fixed'}`;
    nameList.appendChild(div);
  });
}

function fixNextName() {
  const nextGrinchIndex = santasArr.indexOf('Grinch');
  if (nextGrinchIndex !== -1 && currentFixIndex < missingNamesArr.length) {
    santasArr[nextGrinchIndex] = missingNamesArr[currentFixIndex];
    currentFixIndex++;
    renderList();
  }

  if (
    santasArr.indexOf('Grinch') === -1 ||
    currentFixIndex >= missingNamesArr.length
  ) {
    fixButton.disabled = true;
    fixButton.textContent = 'All Fixed!';
  }
}

// Help popup functionality
helpIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  helpPopup.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!helpIcon.contains(e.target) && !helpPopup.contains(e.target)) {
    helpPopup.classList.remove('show');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    helpPopup.classList.remove('show');
  }
});

fixButton.addEventListener('click', fixNextName);

// Initial render
renderList();
