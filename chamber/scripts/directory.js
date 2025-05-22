const directory = document.getElementById("directory");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

// Fetch member data
async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

// Display members
function displayMembers(members) {
  directory.innerHTML = ""; // Clear existing content

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" />
      <div>
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `;

    directory.appendChild(card);
  });
}

// Toggle between views
gridBtn.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});

// Load members on page load
getMembers();
