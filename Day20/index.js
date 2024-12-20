/*
 * 🎅 Task:
 * - Generate an elf first and last name that matches the user’s first and last name initials, then display it on the screen.
 * - Example: if the user’s name is "John Doe," the elf name could be "Joyful Dazzle."
 * - Display the generated elf names in the "Registered Employees" list.
 */

/*
 * 🌟 Stretch Goals:
 * - Generate the elf names using an LLM API (like HuggingFace).
 * - Don't save the same name twice. (not necessary for the normal task)
 * - Make sure to use Scrimba's environment variables feature so you don't expose your API key
 */

const elfFirstNames = [
  // A names
  'Aurora',
  'Alpine',
  'Angel',
  // B names
  'Blitzen',
  'Berry',
  'Bright',
  // C names
  'Crispin',
  'Crystal',
  'Cheer',
  // D names
  'Dazzle',
  'Dasher',
  'Dewdrop',
  // E names
  'Evergreen',
  'Echo',
  'Ember',
  // F names
  'Frost',
  'Flicker',
  'Fable',
  // G names
  'Glimmer',
  'Garland',
  'Glow',
  // H names
  'Holly',
  'Hope',
  'Harvest',
  // I names
  'Icicle',
  'Ivy',
  'Iris',
  // J names
  'Joyful',
  'Jingle',
  'Jolly',
  // K names
  'Kringle',
  'Kindle',
  'Kris',
  // L names
  'Luna',
  'Laurel',
  'Light',
  // M names
  'Merry',
  'Miracle',
  'Mint',
  // N names
  'Nutmeg',
  'Noel',
  'North',
  // O names
  'Olwen',
  'Oracle',
  'Olive',
  // P names
  'Pine',
  'Pixie',
  'Plum',
  // Q names
  'Quill',
  'Quest',
  'Quirk',
  // R names
  'Razzle',
  'Robin',
  'Ruby',
  // S names
  'Sparkle',
  'Snow',
  'Star',
  // T names
  'Tinsel',
  'Twinkle',
  'Toast',
  // U names
  'Umbra',
  'Unity',
  'Upton',
  // V names
  'Vixen',
  'Vale',
  'Vesper',
  // W names
  'Whisk',
  'Winter',
  'Wonder',
  // X names
  'Xylo',
  'Xmas',
  'Xiph',
  // Y names
  'Yule',
  'Yarn',
  'Yodel',
  // Z names
  'Zippy',
  'Zephyr',
  'Ziggy',
];

const elfMiddleNames = [
  // A names
  'Alabaster',
  'Astral',
  'Acorn',
  // B names
  'Blessing',
  'Bramble',
  'Breeze',
  // C names
  'Cloudleap',
  'Comet',
  'Crimson',
  // D names
  'Dewfall',
  'Dragon',
  'Driftwood',
  // E names
  'Eventide',
  'Ember',
  'Echo',
  // F names
  'Foxleap',
  'Faelight',
  'Flameheart',
  // G names
  'Greenleaf',
  'Gemstone',
  'Gossamer',
  // H names
  'Honeydew',
  'Heartlight',
  'Hazelwind',
  // I names
  'Ironbell',
  'Icewing',
  'Inklight',
  // J names
  'Juniper',
  'Jewellight',
  'Jadestar',
  // K names
  'Kettle',
  'Kingfrost',
  'Knightglow',
  // L names
  'Leaffall',
  'Lightfoot',
  'Lunarwind',
  // M names
  'Moonbeam',
  'Maplebark',
  'Mistwind',
  // N names
  'Nightsky',
  'Northstar',
  'Nectarsweet',
  // O names
  'Opallight',
  'Owlwing',
  'Oceanmist',
  // P names
  'Patchwork',
  'Pebblemist',
  'Pinecrest',
  // Q names
  'Quillwind',
  'Quickleap',
  'Quietbrook',
  // R names
  'Rainfall',
  'Riverlight',
  'Rosedawn',
  // S names
  'Silverleaf',
  'Starglow',
  'Sunbeam',
  // T names
  'Twilight',
  'Thistledown',
  'Thunderheart',
  // U names
  'Umbermist',
  'Unicornwind',
  'Upperlight',
  // V names
  'Vinewhirl',
  'Violetdusk',
  'Vanguard',
  // W names
  'Whisperwind',
  'Winterlight',
  'Wavecrest',
  // X names
  'Xanadu',
  'Xenonlight',
  'Xylophone',
  // Y names
  'Yearning',
  'Yewbranch',
  'Yellowleaf',
  // Z names
  'Zenith',
  'Zephyrlight',
  'Zealwind',
];

const elfLastNames = [
  // A names
  'Applecheeks',
  'Angelwing',
  'Arcticbreeze',
  // B names
  'Bells',
  'Brightstar',
  'Berrytwist',
  // C names
  'Candycane',
  'Cindersnap',
  'Crystalfall',
  // D names
  'Dazzlebright',
  'Dreamweaver',
  'Deerleap',
  // E names
  'Everbright',
  'Elfglow',
  'Evermist',
  // F names
  'Frostwhisk',
  'Fairlight',
  'Firestar',
  // G names
  'Gingersnap',
  'Giftmaker',
  'Goldenheart',
  // H names
  'Hollyberry',
  'Heartglow',
  'Honeyspice',
  // I names
  'Icestorm',
  'Ivyweave',
  'Inkspell',
  // J names
  'Jovial',
  'Jinglestep',
  'Jewelsprite',
  // K names
  'Kindleflame',
  'Keepsake',
  'Knightstar',
  // L names
  'Lightwhisper',
  'Leafdancer',
  'Lullaby',
  // M names
  'Merrysprout',
  'Moonbeam',
  'Mistletoe',
  // N names
  'Nutcracker',
  'Northwind',
  'Nightspell',
  // O names
  'Oakenleaf',
  'Ornament',
  'Owlwing',
  // P names
  'Peppermint',
  'Pinecone',
  'Polarbright',
  // Q names
  'Quicksilver',
  'Questwind',
  'Quillweaver',
  // R names
  'Raindrop',
  'Ribbonwrap',
  'Redberry',
  // S names
  'Snowdust',
  'Starlight',
  'Sugarplum',
  // T names
  'Twinkletoes',
  'Treeblossom',
  'Tinkerbell',
  // U names
  'Underwood',
  'Unicornmist',
  'Upperstar',
  // V names
  'Velvet',
  'Vanillafrost',
  'Vineweaver',
  // W names
  'Winterberry',
  'Wanderglow',
  'Wishmaker',
  // X names
  'Xylospark',
  'Xmasglow',
  'Xenonspell',
  // Y names
  'Yuletide',
  'Yesterglow',
  'Yarnweaver',
  // Z names
  'Zestwind',
  'Zephyrheart',
  'Zigzagstar',
];

const registeredElfNames = new Set();

// Get DOM elements
const form = document.getElementById('form');
const generateBtn = document.getElementById('generate-btn');
const elfNameDisplay = document.getElementById('elf-name-display');
const elfNamesList = document.getElementById('elf-names-list');
const helpButton = document.getElementById('help-button');
const helpModal = document.getElementById('help-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModal = document.getElementById('close-modal');

function getMatchingNames(initial, nameArray) {
  return nameArray.filter(
    (name) => name.charAt(0).toUpperCase() === initial.toUpperCase()
  );
}

function generateElfName(firstName, middleName, lastName) {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  // Get matching names for first and last (required)
  const matchingFirstNames = getMatchingNames(firstInitial, elfFirstNames);
  const matchingLastNames = getMatchingNames(lastInitial, elfLastNames);

  if (matchingFirstNames.length === 0 || matchingLastNames.length === 0) {
    return null;
  }

  // If middle name is provided, get matching middle names
  let elfName = '';
  if (middleName && middleName.trim() !== '') {
    const middleInitial = middleName.charAt(0).toUpperCase();
    const matchingMiddleNames = getMatchingNames(middleInitial, elfMiddleNames);

    if (matchingMiddleNames.length > 0) {
      const randomFirst =
        matchingFirstNames[
          Math.floor(Math.random() * matchingFirstNames.length)
        ];
      const randomMiddle =
        matchingMiddleNames[
          Math.floor(Math.random() * matchingMiddleNames.length)
        ];
      const randomLast =
        matchingLastNames[Math.floor(Math.random() * matchingLastNames.length)];
      elfName = `${randomFirst} ${randomMiddle} ${randomLast}`;
    }
  } else {
    // Generate name without middle name
    const randomFirst =
      matchingFirstNames[Math.floor(Math.random() * matchingFirstNames.length)];
    const randomLast =
      matchingLastNames[Math.floor(Math.random() * matchingLastNames.length)];
    elfName = `${randomFirst} ${randomLast}`;
  }

  // If name is already taken, try to generate a new one (up to 10 attempts)
  let attempts = 0;
  const maxAttempts = 10;

  while (registeredElfNames.has(elfName) && attempts < maxAttempts) {
    if (middleName && middleName.trim() !== '') {
      const randomFirst =
        matchingFirstNames[
          Math.floor(Math.random() * matchingFirstNames.length)
        ];
      const randomMiddle =
        matchingMiddleNames[
          Math.floor(Math.random() * matchingMiddleNames.length)
        ];
      const randomLast =
        matchingLastNames[Math.floor(Math.random() * matchingLastNames.length)];
      elfName = `${randomFirst} ${randomMiddle} ${randomLast}`;
    } else {
      const randomFirst =
        matchingFirstNames[
          Math.floor(Math.random() * matchingFirstNames.length)
        ];
      const randomLast =
        matchingLastNames[Math.floor(Math.random() * matchingLastNames.length)];
      elfName = `${randomFirst} ${randomLast}`;
    }
    attempts++;
  }

  return registeredElfNames.has(elfName) ? null : elfName;
}

function updateElfNamesList(elfName) {
  if (elfNamesList.children[0].textContent === 'Seems empty...') {
    elfNamesList.innerHTML = '';
  }

  const listItem = document.createElement('li');
  listItem.textContent = elfName;
  elfNamesList.appendChild(listItem);
}

function showModal() {
  helpModal.classList.add('show');
  modalOverlay.classList.add('show');
}

function hideModal() {
  helpModal.classList.remove('show');
  modalOverlay.classList.remove('show');
}

generateBtn.addEventListener('click', () => {
  const firstName = form.elements['first-name'].value.trim();
  const middleName = form.elements['middle-name'].value.trim();
  const lastName = form.elements['last-name'].value.trim();

  if (!firstName || !lastName) {
    elfNameDisplay.textContent = 'Please enter at least first and last names';
    return;
  }

  const elfName = generateElfName(firstName, middleName, lastName);

  if (!elfName) {
    elfNameDisplay.textContent =
      'All possible elf names for these initials are taken!';
    return;
  }

  registeredElfNames.add(elfName);
  elfNameDisplay.textContent = elfName;
  updateElfNamesList(elfName);

  form.reset();
});

helpButton.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);
