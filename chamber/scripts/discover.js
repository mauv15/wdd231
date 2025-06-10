async function loadCards() {
  const response = await fetch('data/items.json');
  const data = await response.json();
  const container = document.querySelector('.card-container');

  data.forEach((item, index) => {
    const card = document.createElement('section');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" alt="${item.title}">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button data-index="${index}">Learn More</button>
    `;
    container.appendChild(card);

    // Create modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" data-index="${index}">&times;</span>
        <h2>${item.title}</h2>
        <img src="${item.image}" alt="${item.title}">
        <address>${item.address}</address>
        <p>${item.description}</p>
        ${item.more ? `<p>${item.more}</p>` : ''}
      </div>
    `;
    document.body.appendChild(modal);
  });

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

loadCards();


const msgContainer = document.querySelector('#visit-msg');
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  msgContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysPassed = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
  msgContainer.textContent = daysPassed < 1
    ? "Back so soon! Awesome!"
    : `You last visited ${daysPassed} day${daysPassed === 1 ? '' : 's'} ago.`;
}
localStorage.setItem("lastVisit", now);