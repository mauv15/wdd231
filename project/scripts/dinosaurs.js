let dinosaurs = [];  // store all data globally for filtering

async function loadCards() {
  const response = await fetch('data/dinosaurs.json');
  dinosaurs = await response.json(); // store globally
  displayCards(dinosaurs); // initially show all
}

function displayCards(dinoArray) {
  const container = document.querySelector('.card-container');
  container.innerHTML = ''; // clear existing cards and modals
  // Remove existing modals from body
  document.querySelectorAll('.modal').forEach(modal => modal.remove());

  dinoArray.forEach((dinosaur, index) => {
    // Create card
    const card = document.createElement('section');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${dinosaur.name}</h2>
      <figure>
        <img src="${dinosaur.image}" alt="${dinosaur.title}">
      </figure>
      <h3>${dinosaur.family}</h3>
      <p>${dinosaur.type}</p>
      <p>${dinosaur.era}</p>
      <button data-index="${index}">Learn More</button>
    `;
    container.appendChild(card);

    // Create modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" data-index="${index}">&times;</span>
        <h2>${dinosaur.name}</h2>
        <img src="${dinosaur.image}" alt="${dinosaur.name}">
        <h3>${dinosaur.name} was a ${dinosaur.type} belonging to the ${dinosaur.family} family</h3>
        <p>It lived in ${dinosaur.where} in the ${dinosaur.era}, approximately ${dinosaur.time} million years ago</p>
        ${dinosaur.more ? `<p>${dinosaur.more}</p>` : ''}
      </div>
    `;
    document.body.appendChild(modal);
  });

  // Add modal event listeners
  addModalEventListeners();
}

function addModalEventListeners() {
  // Open modal
  document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      document.querySelectorAll('.modal')[index].style.display = 'block';
    });
  });

  // Close modal
  document.querySelectorAll('.close').forEach(span => {
    span.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      document.querySelectorAll('.modal')[index].style.display = 'none';
    });
  });

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
}

// Filter buttons
document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const type = button.dataset.type;
    if (type === 'all') {
      displayCards(dinosaurs); // show all
    } else {
      const filtered = dinosaurs.filter(dino => dino.type.toLowerCase() === type.toLowerCase());
      displayCards(filtered);
    }
  });
});

loadCards();
