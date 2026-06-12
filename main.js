document.getElementById('year').textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lightbox-img');
const lbClose  = document.getElementById('lightbox-close');
const lbPrev   = document.getElementById('lightbox-prev');
const lbNext   = document.getElementById('lightbox-next');

const items = Array.from(document.querySelectorAll('.gallery-item'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lbImg.src = items[index].dataset.img;
  lbImg.alt = items[index].querySelector('.gallery-title').textContent;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  lbClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  lbImg.src = items[currentIndex].dataset.img;
  lbImg.alt = items[currentIndex].querySelector('.gallery-title').textContent;
}

function showNext() {
  currentIndex = (currentIndex + 1) % items.length;
  lbImg.src = items[currentIndex].dataset.img;
  lbImg.alt = items[currentIndex].querySelector('.gallery-title').textContent;
}

items.forEach((item, index) => {
  item.querySelector('.gallery-img-wrap').addEventListener('click', () => openLightbox(index));
  item.querySelector('.gallery-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(index);
  });
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});
