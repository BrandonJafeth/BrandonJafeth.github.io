 // Esto se llama fetch es para traer la información desde el link que se este llamando en este caso es el archivo json pero normalmente es de una api 
function loadData() {
    return fetch('/data/BerryJerry.json')
      .then(response => response.json())
      .catch(error => console.error('Error loading the JSON:', error));
}


// Esta función es para renderizar la información que se trae desde el json que es donde van todas las demas funciones de render aqui puedes introducir las tuyas
function renderInfo(data) {
    renderHero(data);
    renderServices(data);
    renderInfoFooter(data);
    renderCustomerReviews(data);
    renderGallery(data);
}


// Esta función es para renderizar el hero que es la parte de arriba de la pagina

function renderHero(data) {
    document.getElementById('BerryJerry-hero').textContent = data.hero.title;
    document.getElementById('description-hero').textContent = data.hero.description;
    document.getElementById('background-hero').src = data.hero.image;
    document.getElementById('BerryJerry-icon-Id').src = data.iconImage;
}


// Esta función es para renderizar los servicios que se encuentran en el json 
function renderServices(data) {
  const servicesContainer = document.getElementById('cards-id');
  servicesContainer.innerHTML = ''; 
  data.services.forEach(service => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';

      const card = document.createElement('div');
      card.className = 'card';

      const title = document.createElement('h3');
      title.textContent = service.title;

      const image = document.createElement('img');
      image.src = service.image;
      image.alt = service.title;

      card.appendChild(title);
      card.appendChild(image);

      const descriptionContainer = document.createElement('div');
      descriptionContainer.className = 'description-container';

      const description = document.createElement('p');
      description.textContent = service.description;

      descriptionContainer.appendChild(description);

      cardContainer.appendChild(card);
      cardContainer.appendChild(descriptionContainer);

      servicesContainer.appendChild(cardContainer);
  });
}

function renderGallery(data) {

  const galleryContent = data.gallery;
  const galleryContainer = document.querySelector('#gallery-img-container-id');

  if (galleryContent && galleryContent.length > 0) {
    galleryContent.forEach((galleryItem) => {
      const galleryCard = document.createElement('div');
      galleryCard.className = 'gallery-card';

      const picture = document.createElement('img');
      picture.src = galleryItem.image; 
      picture.className = 'gallery-img';

      galleryCard.appendChild(picture);
      galleryContainer.appendChild(galleryCard);
    });
  } else {
    console.log('No gallery found in data');
  }
}

function renderCustomerReviews(data){
  const reviewsContainer = document.getElementById('reviews-container-id');
  reviewsContainer.innerHTML = '';
  
  data.customerReviews.forEach(customerReviews =>{
    const card = document.createElement('div');
    card.className = 'customer-card';

    const img = document.createElement('img');
    img.id = 'customer-img';
    img.src = customerReviews.image;
    img.alt = customerReviews.name;

    const name = document.createElement('h3');
    name.id = 'customer-name';
    name.textContent = customerReviews.name;

    const description = document.createElement('p');
    description.id = 'review-description';
    description.textContent = customerReviews.description;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);

    reviewsContainer.appendChild(card);
  });
}


function renderInfoFooter(data){
  document.getElementById('footer-icon-id').src = data.iconImage;
  document.getElementById('footer-desc-id').textContent = data.footerInfo.description;
  document.getElementById('phone-number-id').textContent = data.footerInfo.contactUs.phone;
  document.getElementById('email-address-id').textContent = data.footerInfo.contactUs.email;

}

// Esta función es para que se ejecute el contenido de la pagina cuando se cargue el contenido de la pagina
document.addEventListener('DOMContentLoaded', function() {
    loadData().then(data => {
        renderInfo(data);
    });
});


// Esta función es para que se ejecute el contenido de la pagina cuando se cargue el contenido de la pagina que son simples animaciones 

const heroElements = document.querySelectorAll('.container-hero > *');
heroElements.forEach((element, index) => {

  element.style.animationDelay = `${index * 0.8}s`;
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


document.addEventListener('DOMContentLoaded', () => {
  const servicesButton = document.getElementById('aboutus-hero');
  servicesButton.addEventListener('click', () => {
    document.getElementById('section-services').scrollIntoView({ behavior: 'smooth' });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const aboutUsLink = document.getElementById('about-us-link');
  aboutUsLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('section-hero').scrollIntoView({ behavior: 'smooth' });
  });
});