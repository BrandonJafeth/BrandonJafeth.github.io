var UrlApi = 'http://localhost:3000';

function fetchData(endpoint) {
  return fetch(`${UrlApi}/${endpoint}`)
    .then(response => response.json())
    .catch(error => console.error(`Error loading ${endpoint}:`, error));
}

function loadData() {
  return Promise.all([
    fetchData('hero'),
    fetchData('services'),
    fetchData('footer'),
    fetchData('reviews'),
    fetchData('gallery')
  ]);
}

function renderInfo([heroData, servicesData, footerData, customerReviewsData, galleryData]) {
  renderHero(heroData);
  renderServices(servicesData);
  renderInfoFooter(footerData);
  renderCustomerReviews(customerReviewsData);
  renderGallery(galleryData);
}

function renderHero(dataArray) {
  dataArray.forEach(data => {
    document.getElementById('BerryJerry-hero').src = data.titleHero;
    document.getElementById('description-hero').textContent = data.descriptionHero;
    document.getElementById('background-hero').src = data.imageHero;
    document.getElementById('BerryJerry-icon-Id').src = data.iconBerry;
    document.getElementById('hero-background-png-id').src = data.heropng;
  });
}

function renderServices(data) {
  const servicesContainer = document.getElementById('cards-id');
  servicesContainer.innerHTML = '';
  data.forEach((service, index) => {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    const card = document.createElement('div');
    card.className = 'card';

    if (index === data.length - 1) {
      card.id = 'last-card';
    }

    const title = document.createElement('h3');
    title.textContent = service.titleService;

    const image = document.createElement('img');
    image.src = service.imageService;
    image.alt = service.titleService;

    const description = document.createElement('p');
    description.textContent = service.descriptionService;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);

    cardContainer.appendChild(card);
    servicesContainer.appendChild(cardContainer);
  });
}

function renderGallery(dataArray) {
  const galleryContainer = document.querySelector('#gallery-img-container-id');
  galleryContainer.innerHTML = '';

  if (dataArray && dataArray.length > 0) {
    let autoChangeInterval;

    const getScreenSizeIndexes = () => {
      const screenWidth = window.innerWidth;
      return screenWidth <= 1235 ? [0] : [0, 1, 2];
    };

    let currentIndexes = getScreenSizeIndexes();

    const updateGallery = () => {
      const screenWidth = window.innerWidth;
      const imagesToShow = screenWidth <= 1235 ? 1 : 3;

      currentIndexes = currentIndexes.slice(0, imagesToShow);

      const currentCards = galleryContainer.querySelectorAll('.gallery-card');
      currentCards.forEach(card => card.style.opacity = '0');

      setTimeout(() => {
        galleryContainer.innerHTML = '';
        currentIndexes.forEach(index => {
          if (index < dataArray.length) {
            const galleryCard = document.createElement('div');
            galleryCard.className = 'gallery-card';
            galleryCard.style.opacity = '0';

            const picture = document.createElement('img');
            picture.src = dataArray[index % dataArray.length].url;
            picture.className = 'gallery-img';

            galleryCard.appendChild(picture);
            galleryContainer.appendChild(galleryCard);

            setTimeout(() => galleryCard.style.opacity = '1', 10);
          }
        });
      }, 600);
    };

    const startAutoChange = () => {
      if (autoChangeInterval) clearInterval(autoChangeInterval);
      autoChangeInterval = setInterval(() => {
        currentIndexes = currentIndexes.map(index =>
          (index + 1) % dataArray.length);
        updateGallery();
      }, 3000);
    };

    document.querySelector('#prev').addEventListener('click', () => {
      if (dataArray.length > 2) {
        currentIndexes = currentIndexes.map(index =>
          (index - 1 + dataArray.length) % dataArray.length);
        updateGallery();
        startAutoChange();
      }
    });

    document.querySelector('#next').addEventListener('click', () => {
      if (dataArray.length > 2) {
        currentIndexes = currentIndexes.map(index =>
          (index + 1) % dataArray.length);
        updateGallery();
        startAutoChange();
      }
    });

    updateGallery();
    startAutoChange();

    window.addEventListener('resize', () => {
      currentIndexes = getScreenSizeIndexes();
      updateGallery();
    });
  } else {
    console.log('No gallery found in data');
  }
}

function renderCustomerReviews(dataArray) {
  const reviewsContainer = document.getElementById('reviews-container-id');
  reviewsContainer.innerHTML = '';

  dataArray.forEach(customerReview => {
    const card = document.createElement('div');
    card.className = 'customer-card';

    const img = document.createElement('img');
    img.id = 'customer-img';
    img.src = customerReview.customerImage;
    img.alt = customerReview.customerName;

    const name = document.createElement('h3');
    name.id = 'customer-name';
    name.textContent = customerReview.customerName;

    const description = document.createElement('p');
    description.id = 'review-description';
    description.textContent = customerReview.customerDescription;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);

    reviewsContainer.appendChild(card);
  });

  let currentReviewIndex = 0;
  const cards = document.querySelectorAll('.customer-card');
  const totalCards = cards.length;

  function showReviews(startIndex) {
    const screenWidth = window.innerWidth;
    const reviewsToShow = screenWidth <= 1235 ? 1 : 3;

    cards.forEach((card, index) => {
      card.style.display = (index >= startIndex && index < startIndex + reviewsToShow) ? 'flex' : 'none';
    });
  }

  showReviews(currentReviewIndex);

  document.getElementById('prev-costumer').addEventListener('click', () => {
    currentReviewIndex = (currentReviewIndex > 0) ? currentReviewIndex - 1 : totalCards - 1;
    showReviews(currentReviewIndex);
  });

  document.getElementById('next-costumer').addEventListener('click', () => {
    currentReviewIndex = (currentReviewIndex < totalCards - 1) ? currentReviewIndex + 1 : 0;
    showReviews(currentReviewIndex);
  });

  window.addEventListener('resize', () => {
    showReviews(currentReviewIndex);
  });
}

function renderInfoFooter(dataArray) {
  dataArray.forEach(data => {
    document.getElementById('footer-icon-id').src = data.iconFooter;
    document.getElementById('footer-desc-id').textContent = data.descriptionFooter;
    document.getElementById('phone-number-id').textContent = data.phoneFooter;
    document.getElementById('email-address-id').textContent = data.emailFooter;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  loadData().then(data => {
    renderInfo(data);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const heroElements = document.querySelectorAll('.container-hero > *');
  heroElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.4}s`;
    element.style.opacity = 1;
  });

  const fadeInSections = document.querySelectorAll('.fade-in-section');

  const revealOnScroll = () => {
    fadeInSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const isVisible = sectionTop < window.innerHeight - 100;

      if (isVisible) {
        section.style.opacity = 1;
        section.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  const servicesButton = document.getElementById('aboutus-hero-id');
  servicesButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('section-services').scrollIntoView({ behavior: 'smooth' });
  });

  const aboutUsLink = document.getElementById('about-us-link');
  aboutUsLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('section-hero').scrollIntoView({ behavior: 'smooth' });
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navUl = document.querySelector('nav ul');

  navToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });
});

