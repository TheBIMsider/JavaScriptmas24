document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.pricing-toggle button');
  const monthlySpan = document.querySelector('.pricing-toggle .monthly');
  const annuallySpan = document.querySelector('.pricing-toggle .annually');
  const amounts = document.querySelectorAll('.price .amount');
  const periods = document.querySelectorAll('.price .period');

  function updatePricing(isAnnual) {
    amounts.forEach((amount) => {
      const value = isAnnual ? amount.dataset.annually : amount.dataset.monthly;
      amount.textContent = `$${value}`;
    });

    periods.forEach((period) => {
      period.textContent = isAnnual ? '/annually' : '/monthly';
    });

    monthlySpan.classList.toggle('active', !isAnnual);
    annuallySpan.classList.toggle('active', isAnnual);
    toggle.classList.toggle('annual', isAnnual);
  }

  // Toggle click handler
  toggle.addEventListener('click', () => {
    const isAnnual = !toggle.classList.contains('annual');
    updatePricing(isAnnual);
  });

  // Span click handlers
  monthlySpan.addEventListener('click', () => updatePricing(false));
  annuallySpan.addEventListener('click', () => updatePricing(true));
});
