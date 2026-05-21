document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  let currentIndex = 0;
  let scrollY = 0;

  function getSrcs() {
    return Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);
  }

  function openLightbox(index) {
    const srcs = getSrcs();
    currentIndex = index;
    scrollY = window.scrollY;
    lightboxImg.src = srcs[currentIndex];
    lightbox.classList.add('open');
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.width = '100%';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }

  function showPrev() {
    const srcs = getSrcs();
    currentIndex = (currentIndex - 1 + srcs.length) % srcs.length;
    lightboxImg.src = srcs[currentIndex];
  }

  function showNext() {
    const srcs = getSrcs();
    currentIndex = (currentIndex + 1) % srcs.length;
    lightboxImg.src = srcs[currentIndex];
  }

  document.querySelectorAll('.gallery-item').forEach(function (item, i) {
    item.addEventListener('click', function () { openLightbox(i); });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
});