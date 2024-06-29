function loadData() {
    return fetch('/data/BerryJerry.json')
      .then(response => response.json())
      .catch(error => console.error('Error loading the JSON:', error));
  }



  function renderInfo(data) {
    renderHero(data);
    renderServices(data);
}


  function renderHero(data) {
    document.getElementById('BerryJerry-hero').textContent = data.hero.title;
    document.getElementById('description-hero').textContent = data.hero.description;
    document.getElementById('background-hero').src = data.hero.image;
    document.getElementById('BerryJerry-icon-Id').src = data.iconImage;
}

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





document.addEventListener('DOMContentLoaded', function() {
    loadData().then(data => {
        renderInfo(data);
    });
});