document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelectorAll('.product-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.close');

  products.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.querySelector('img').src;
      lightboxImg.src = imgSrc;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});