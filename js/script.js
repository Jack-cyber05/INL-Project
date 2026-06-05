const cards    = document.querySelectorAll('.card-wrap');
const pips     = document.querySelectorAll('.pip');
const progress = document.getElementById('progress');
const countEl  = document.getElementById('visible-count');
let visibleCount = 0;
 
/* ── Scroll-triggered entrance via IntersectionObserver ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
 
      // Reveal the card
      entry.target.classList.add('visible');
 
      // Update counter and progress bar
      visibleCount++;
      countEl.textContent = visibleCount;
      progress.style.width = (visibleCount / cards.length * 100) + '%';
 
      // Light up the corresponding pip
      const idx = [...cards].indexOf(entry.target);
      pips[idx].classList.add('on');
    }
  });
}, { threshold: .2 });
 
cards.forEach(card => observer.observe(card));
 
/* ── Touch / Click — flip toggle for mobile ── */
cards.forEach((card, i) => {
 
  card.addEventListener('click', () => {
    const isFlipped = card.classList.contains('touch-flipped');
    // Collapse any open card first
    cards.forEach(c => c.classList.remove('touch-flipped'));
    if (!isFlipped) card.classList.add('touch-flipped');
  });
 
  /* ── Keyboard accessibility (Enter / Space to flip) ── */
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
 
  /* ── Pip highlight syncs with hover on desktop ── */
  card.addEventListener('mouseenter', () => {
    pips.forEach(p => p.classList.remove('on'));
    pips[i].classList.add('on');
  });
 
  card.addEventListener('mouseleave', () => {
    // Restore pips for all visible cards
    pips.forEach((p, j) => {
      p.classList.toggle('on', cards[j].classList.contains('visible'));
    });
  });
});
