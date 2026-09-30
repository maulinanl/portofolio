const rail = document.getElementById('rail');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

// jarak geser = lebar 1 kartu + jarak antar kartu (24px, sama dengan gap di CSS)
function jarakGeser() {
  return rail.querySelector('.card').offsetWidth + 24;
}

next.addEventListener('click', () => {
  rail.scrollBy({ left: jarakGeser(), behavior: 'smooth' });
});

prev.addEventListener('click', () => {
  rail.scrollBy({ left: -jarakGeser(), behavior: 'smooth' });
});

// ===== ANIMASI =====
const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// urutan muncul elemen hero
document.querySelectorAll('.intro > *, .focus li').forEach((el, i) => {
  el.style.setProperty('--i', i);
});

// scroll reveal
if (!kurangiGerak && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '#projects h2, .arrows, .card, .mid h2, .mid h3, .school, .deg, .pills li, .steps li, .contact h2, .lead, .links li'
  ).forEach((el) => {
    el.classList.add('reveal');
    // jeda bertingkat sesuai urutan di antara saudaranya
    el.style.setProperty('--d', [...el.parentElement.children].indexOf(el) * 90 + 'ms');
    io.observe(el);
  });
}