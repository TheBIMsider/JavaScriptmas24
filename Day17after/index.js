/*
Santa needs extra help in the run up to Christmas so he has created this advert with a form to allow elves and helpers to sign up.

In the small print, it says “we believe in equal opportunities”. But there is no evidence of that in this website because it has a ton of accessibility issues!

**Task**
Your task is to find and correct the accessibility issues. There are broadly four areas to think about. I have put details in hint.md but why not try to solve the issues without checking hint.md first!

You will need to change code in index.html and index.css to complete this challenge.
*/

// Form validation patterns
const patterns = {
  name: /^[a-zA-Z\s]{2,30}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

// Translations object
const translations = {
  en: {
    title: 'Santa Needs You!',
    recruiting: "We're recruiting elves and helpers!",
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    applyNow: 'Apply Now',
    jobQuote: 'Excellent pay and conditions. Plenty of travel!',
    footer: 'We believe in equal opportunities. For full terms and conditions',
    clickHere: 'click here',
    emailReceived: 'Email received! Thank you 🎅',
    selectLanguage: 'Select Language',
    skipToForm: 'Skip to application form',
    enterName: 'Please enter your name',
    validation: {
      emailRequired: 'Please enter your email address',
      emailInvalid: 'Please enter a valid email',
      nameRequired: 'Please enter your name',
      nameInvalid: 'Please enter a valid name',
    },
    modal: {
      title: 'Accessibility Features',
      keyboardTitle: 'Keyboard Navigation',
      keyboardFeatures: [
        'Press Tab to move between form fields',
        'Orange highlights show which element is focused',
        "Press Tab at page start to reveal the 'Skip to form' link",
      ],
      formTitle: 'Form Features',
      formFeatures: [
        'Red borders indicate invalid input',
        'Green borders show valid input',
        'Screen readers announce field requirements',
        'Clear error messages for invalid input',
      ],
      additionalTitle: 'Additional Features',
      additionalFeatures: [
        'High contrast text for better readability',
        'Language selection available',
        'Screen reader announcements for form submission',
        'All images have descriptive text',
      ],
    },
  },
  es: {
    title: '¡Santa te Necesita!',
    recruiting: '¡Estamos reclutando elfos y ayudantes!',
    fullName: 'Nombre Completo',
    emailAddress: 'Correo Electrónico',
    applyNow: 'Aplicar Ahora',
    jobQuote: '¡Excelente salario y condiciones. ¡Muchos viajes!',
    footer:
      'Creemos en la igualdad de oportunidades. Para términos y condiciones',
    clickHere: 'haga clic aquí',
    emailReceived: '¡Correo recibido! Gracias 🎅',
    selectLanguage: 'Seleccionar Idioma',
    skipToForm: 'Ir al formulario',
    enterName: 'Por favor ingrese su nombre',
    validation: {
      emailRequired: 'Por favor ingrese su correo electrónico',
      emailInvalid: 'Por favor ingrese un correo electrónico válido',
      nameRequired: 'Por favor ingrese su nombre',
      nameInvalid: 'Por favor ingrese un nombre válido',
    },
    modal: {
      title: 'Características de Accesibilidad',
      keyboardTitle: 'Navegación por Teclado',
      keyboardFeatures: [
        'Presione Tab para moverse entre campos del formulario',
        'Los resaltados naranjas muestran el elemento enfocado',
        "Presione Tab al inicio para mostrar el enlace 'Ir al formulario'",
      ],
      formTitle: 'Características del Formulario',
      formFeatures: [
        'Los bordes rojos indican entrada inválida',
        'Los bordes verdes muestran entrada válida',
        'Los lectores de pantalla anuncian los requisitos de campo',
        'Mensajes claros de error para entradas inválidas',
      ],
      additionalTitle: 'Características Adicionales',
      additionalFeatures: [
        'Texto de alto contraste para mejor legibilidad',
        'Selección de idioma disponible',
        'Anuncios de lector de pantalla para el envío del formulario',
        'Todas las imágenes tienen texto descriptivo',
      ],
    },
  },
  fr: {
    title: 'Le Père Noël a Besoin de Vous!',
    recruiting: 'Nous recrutons des elfes et des assistants!',
    fullName: 'Nom Complet',
    emailAddress: 'Adresse Email',
    applyNow: 'Postuler Maintenant',
    jobQuote: 'Excellent salaire et conditions. Beaucoup de voyages!',
    footer:
      "Nous croyons en l'égalité des chances. Pour les termes et conditions",
    clickHere: 'cliquez ici',
    emailReceived: 'Email reçu! Merci 🎅',
    selectLanguage: 'Choisir la Langue',
    skipToForm: 'Aller au formulaire',
    enterName: 'Veuillez entrer votre nom',
    validation: {
      emailRequired: 'Veuillez saisir votre adresse email',
      emailInvalid: 'Veuillez saisir une adresse email valide',
      nameRequired: 'Veuillez saisir votre nom',
      nameInvalid: 'Veuillez saisir un nom valide',
    },
    modal: {
      title: "Fonctionnalités d'Accessibilité",
      keyboardTitle: 'Navigation au Clavier',
      keyboardFeatures: [
        'Appuyez sur Tab pour naviguer entre les champs',
        "Les surlignages orange montrent l'élément sélectionné",
        "Appuyez sur Tab au début pour afficher le lien 'Aller au formulaire'",
      ],
      formTitle: 'Fonctionnalités du Formulaire',
      formFeatures: [
        'Les bordures rouges indiquent une saisie invalide',
        'Les bordures vertes indiquent une saisie valide',
        "Les lecteurs d'écran annoncent les exigences des champs",
        "Messages d'erreur clairs pour les saisies invalides",
      ],
      additionalTitle: 'Fonctionnalités Supplémentaires',
      additionalFeatures: [
        'Texte à fort contraste pour une meilleure lisibilité',
        'Sélection de langue disponible',
        "Annonces du lecteur d'écran pour la soumission du formulaire",
        'Toutes les images ont un texte descriptif',
      ],
    },
  },
};

// Function to validate form input
function validateInput(input) {
  if (!input) return false;

  const errorElement = document.getElementById(`${input.id}-error`);
  if (!errorElement) return false;

  errorElement.textContent = '';
  input.setAttribute('aria-invalid', 'false');

  const currentLang = document.getElementById('language')?.value || 'en';
  const t = translations[currentLang]?.validation;
  if (!t) return false;

  if (!input.value.trim()) {
    const message = input.id === 'name' ? t.nameRequired : t.emailRequired;
    errorElement.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    return false;
  }

  if (!patterns[input.id].test(input.value.trim())) {
    const message = input.id === 'name' ? t.nameInvalid : t.emailInvalid;
    errorElement.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    return false;
  }

  return true;
}

// Function to update modal content
function updateModalContent(t) {
  const modal = document.getElementById('a11yHelpModal');
  if (!modal) return;

  // Update modal title
  const modalTitle = modal.querySelector('h2');
  if (modalTitle) modalTitle.textContent = t.modal.title;

  // Update keyboard navigation section
  const keyboardTitle = modal.querySelector('h3:nth-of-type(1)');
  const keyboardList = modal.querySelector('ul:nth-of-type(1)');
  if (keyboardTitle && keyboardList) {
    keyboardTitle.textContent = t.modal.keyboardTitle;
    keyboardList.innerHTML = t.modal.keyboardFeatures
      .map((feature) => `<li>${feature}</li>`)
      .join('');
  }

  // Update form features section
  const formTitle = modal.querySelector('h3:nth-of-type(2)');
  const formList = modal.querySelector('ul:nth-of-type(2)');
  if (formTitle && formList) {
    formTitle.textContent = t.modal.formTitle;
    formList.innerHTML = t.modal.formFeatures
      .map((feature) => `<li>${feature}</li>`)
      .join('');
  }

  // Update additional features section
  const additionalTitle = modal.querySelector('h3:nth-of-type(3)');
  const additionalList = modal.querySelector('ul:nth-of-type(3)');
  if (additionalTitle && additionalList) {
    additionalTitle.textContent = t.modal.additionalTitle;
    additionalList.innerHTML = t.modal.additionalFeatures
      .map((feature) => `<li>${feature}</li>`)
      .join('');
  }
}

// Function to update simple form modal content
function updateSimpleFormModalContent(t) {
  const modal = document.getElementById('simpleFormModal');
  if (!modal) return;

  const nameLabel = modal.querySelector('label[for="quick-name"]');
  const nameInput = modal.querySelector('input[name="quick-name"]');
  if (nameLabel && nameInput) {
    nameLabel.textContent = t.fullName;
    nameInput.placeholder = t.enterName;
  }

  const emailLabel = modal.querySelector('label[for="quick-email"]');
  const emailInput = modal.querySelector('input[name="quick-email"]');
  if (emailLabel && emailInput) {
    emailLabel.textContent = t.emailAddress;
    emailInput.placeholder = t.emailAddress;
  }

  const submitButton = modal.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = t.applyNow;
  }
}

// Function to update page content
function updatePageContent(lang) {
  const t = translations[lang];
  if (!t) return;

  document.documentElement.lang = lang;

  // Update headings and text
  const heading = document.querySelector('h1');
  if (heading) heading.textContent = t.title;

  const recruiting = document.querySelector('header p');
  if (recruiting) recruiting.textContent = t.recruiting;

  // Update form labels and placeholders
  const nameLabel = document.querySelector('label[for="name"]');
  const nameInput = document.querySelector('input[name="name"]');
  if (nameLabel && nameInput) {
    nameLabel.textContent = t.fullName;
    nameInput.placeholder = t.enterName;
  }

  const emailLabel = document.querySelector('label[for="email"]');
  const emailInput = document.querySelector('input[name="email"]');
  if (emailLabel && emailInput) {
    emailLabel.textContent = t.emailAddress;
    emailInput.placeholder = t.emailAddress;
  }

  // Update buttons
  const submitButtons = document.querySelectorAll('button[type="submit"]');
  submitButtons.forEach((button) => {
    button.textContent = t.applyNow;
  });

  // Update quote and footer
  const quote = document.querySelector('.quote p');
  if (quote) quote.textContent = t.jobQuote;

  const footer = document.querySelector('.footer-txt');
  if (footer) {
    footer.innerHTML = `${t.footer} <a href="#" class="terms-link">${t.clickHere}</a>.`;
  }

  // Update success message
  const messages = document.querySelectorAll('.message');
  messages.forEach((message) => {
    message.textContent = t.emailReceived;
  });

  // Update skip link
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) skipLink.textContent = t.skipToForm;

  // Update language selector label
  const langLabel = document.querySelector('label[for="language"]');
  if (langLabel) langLabel.textContent = t.selectLanguage;

  // Update help modal content
  updateModalContent(t);

  // Update simple form modal content
  updateSimpleFormModalContent(t);
}

// Function to handle language change
function changeLanguage(lang) {
  if (translations[lang]) {
    updatePageContent(lang);
    localStorage.setItem('preferredLanguage', lang);
  }
}

// Function to toggle accessibility help modal
function toggleA11yHelp() {
  const modal = document.getElementById('a11yHelpModal');
  if (!modal) return;

  const isHidden = modal.getAttribute('aria-hidden') === 'true';
  modal.setAttribute('aria-hidden', !isHidden);

  if (!isHidden) {
    const helpButton = document.querySelector('.a11y-help-button');
    if (helpButton) helpButton.focus();
  }
}

// Function to toggle the simple form modal
function toggleSimpleForm() {
  const modal = document.getElementById('simpleFormModal');
  if (!modal) return;

  const isHidden = modal.getAttribute('aria-hidden') === 'true';
  modal.setAttribute('aria-hidden', !isHidden);

  if (!isHidden) {
    const closeButton = modal.querySelector('.close-button');
    if (closeButton) closeButton.focus();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  const storedLang = localStorage.getItem('preferredLanguage');
  const browserLang = navigator.language.split('-')[0];
  const defaultLang =
    storedLang || (translations[browserLang] ? browserLang : 'en');

  const langSelect = document.getElementById('language');
  if (langSelect) {
    langSelect.value = defaultLang;
    updatePageContent(defaultLang);
  }

  // Setup form submission handler
  const form = document.querySelector('.signup-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameValid = validateInput(document.getElementById('name'));
      const emailValid = validateInput(document.getElementById('email'));

      if (!nameValid || !emailValid) {
        const firstInvalid = !nameValid
          ? document.getElementById('name')
          : document.getElementById('email');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const message = document.querySelector('.message');
      if (message) {
        message.style.display = 'inline';
        const currentLang = document.getElementById('language')?.value || 'en';
        message.textContent = translations[currentLang]?.emailReceived || '';
      }
    });
  }

  // Setup modal handlers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const helpModal = document.getElementById('a11yHelpModal');

      if (helpModal?.getAttribute('aria-hidden') === 'false') {
        toggleA11yHelp();
      }
    }
  });

  // Setup click handler for help modal
  const helpModal = document.getElementById('a11yHelpModal');
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) toggleA11yHelp();
    });
  }
});
