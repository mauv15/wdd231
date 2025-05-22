document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menu-toggle");
  const nav = document.querySelector(".navigation");

  toggleButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});
