


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
    const servicesContainer = document.getElementById('card-container-id');
    servicesContainer.innerHTML = ''; 
    data.services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h3');
        title.id = 'card-title';
        title.textContent = service.title;

        const image = document.createElement('img');
        image.id = 'card-img';
        image.src = service.image;
        image.alt = service.title;

        const description = document.createElement('p');
        description.id = 'description-service';
        description.textContent = service.description;

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);

        servicesContainer.appendChild(card);
    });
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
