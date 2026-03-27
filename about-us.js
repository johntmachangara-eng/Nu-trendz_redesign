const workCards = document.querySelectorAll('.work-card');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;

// Open lightbox
workCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    currentIndex = index;
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  const img = workCards[index].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.style.display = 'flex';
}

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigate
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + workCards.length) % workCards.length;
  openLightbox(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % workCards.length;
  openLightbox(currentIndex);
});

// Close if clicking outside image
lightbox.addEventListener('click', e => {
  if(e.target === lightbox) lightbox.style.display = 'none';
});