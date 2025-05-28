const spotlightContainer = document.getElementById("spotlight-container");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch members.json");

    const data = await response.json();
    console.log("Fetched members:", data);

    const premiumMembers = data.members.filter(member =>
      member.membershipLevel === 2 || member.membershipLevel === 3
    );

    console.log("Premium members:", premiumMembers);

    const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function displaySpotlights(members) {
  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("spotlight");

    const levelLabel = member.membershipLevel === 3 ? "Gold" :
                       member.membershipLevel === 2 ? "Silver" : "Bronze";

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="level">${levelLabel} Member</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

getMembers();
