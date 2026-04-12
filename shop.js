/* ================================
   PRODUCT STRIP — DRAG + TOUCH + AUTO SCROLL
================================ */
const scrollContainer = document.getElementById("collectionScroll");

if (scrollContainer) {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener("mouseleave", () => isDown = false);
  scrollContainer.addEventListener("mouseup", () => isDown = false);

  scrollContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    scrollContainer.scrollLeft = scrollLeft - (x - startX) * 2;
  });

  scrollContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    scrollContainer.scrollLeft = scrollLeft - (x - startX) * 2;
  });

  setInterval(() => {
    scrollContainer.scrollLeft += 1;
    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
      scrollContainer.scrollLeft = 0;
    }
  }, 20);
}

/* ================================
   PRODUCT LIGHTBOX
================================ */
const productLightbox = document.getElementById("product-lightbox");
const productLightboxImg = document.querySelector(".product-lightbox-img");
const closeBtn = document.querySelector(".product-lightbox-close");
const prevBtn = document.querySelector(".product-lightbox-prev");
const nextBtn = document.querySelector(".product-lightbox-next");

const images = [...document.querySelectorAll(".collection-img")];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  productLightboxImg.src = images[index].src;
  productLightbox.style.display = "flex";
}

images.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

closeBtn.addEventListener("click", () => {
  productLightbox.style.display = "none";
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  productLightboxImg.src = images[currentIndex].src;
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  productLightboxImg.src = images[currentIndex].src;
});

productLightbox.addEventListener("click", (e) => {
  if (e.target === productLightbox) {
    productLightbox.style.display = "none";
  }
});

/* ================================
   YOUTUBE VIDEO CONTROL
================================ */
let shopPlayers = [];

function onYouTubeIframeAPIReady() {
  const videoIframes = document.querySelectorAll("iframe.shop-video");

  videoIframes.forEach((iframe, index) => {
    shopPlayers[index] = new YT.Player(iframe, {
      events: {
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            shopPlayers.forEach((p, i) => {
              if (i !== index) p.pauseVideo();
            });
          }
        }
      }
    });
  });
}

function pauseVideosOnScroll() {
  shopPlayers.forEach(player => {
    const iframe = player.getIframe();
    const rect = iframe.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      player.pauseVideo();
    }
  });
}

window.addEventListener("scroll", pauseVideosOnScroll);
