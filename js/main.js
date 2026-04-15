const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeButton = document.querySelector('.mobile-menu__close');
const overlay = document.querySelector('.menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

function openMenu() {
  burger.classList.add('is-active');
  mobileMenu.classList.add('is-open');
  overlay.hidden = false;
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  burger.classList.remove('is-active');
  mobileMenu.classList.remove('is-open');
  overlay.hidden = true;
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('is-open');

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

closeButton.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

mobileLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 991) {
    closeMenu();
  }
});



// __________слайдер________________

// -----------------------------------------
//        закрыть лестать лево право
// -----------------------------------------
const cards = Array.from(document.querySelectorAll(".gallery__card"));
const slider = document.querySelector(".slider");
const sliderImage = document.querySelector(".slider__image");

const btnPrev = document.querySelector(".slider__btn_left");
const btnNext = document.querySelector(".slider__btn_right");
const btnClose = document.querySelector(".slider__close");

let cardIndex = -1;

/* открыть */
for (const card of cards) {
  card.addEventListener("click", () => {
    cardIndex = cards.indexOf(card);
    showImage();
    slider.classList.add("active");
  });
}

/* показать картинку */
function showImage() {
  const img = cards[cardIndex].querySelector("img");
  const pictureFull = img.cloneNode(true);

  sliderImage.innerHTML = "";

  pictureFull.style.width = "100%";
  pictureFull.style.height = "100%";
  pictureFull.style.objectFit = "contain";

  sliderImage.append(pictureFull);
}

/* стрелки */
btnNext.addEventListener("click", () => {
  cardIndex = (cardIndex + 1) % cards.length;
  showImage();
});

btnPrev.addEventListener("click", () => {
  cardIndex = (cardIndex - 1 + cards.length) % cards.length;
  showImage();
});

/* закрытие */
btnClose.addEventListener("click", () => {
  slider.classList.remove("active");
});

slider.addEventListener("click", (e) => {
  if (e.target === slider) {
    slider.classList.remove("active");
  }
});


// время смены картинки
function showImage() {
  const oldImg = sliderImage.querySelector("img");

  // добавляем плавное исчезновение
  if (oldImg) {
    oldImg.style.opacity = "0";
  }

  setTimeout(() => {
    const img = cards[cardIndex].querySelector("img").cloneNode(true);

    sliderImage.innerHTML = "";

    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.style.opacity = "0";

    sliderImage.append(img);

    // даём браузеру время применить стили
    setTimeout(() => {
      img.style.transition = "opacity 0.3s ease";
      img.style.opacity = "1";
    }, 10);

  }, 300);
}


