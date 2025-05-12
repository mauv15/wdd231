const courses = [
  { name: "CSE 110", category: "CSE" },
  { name: "WDD 130", category: "WDD" },
  { name: "CSE 111", category: "CSE" },
  { name: "CSE 210", category: "CSE" },
  { name: "WDD 131", category: "WDD" },
  { name: "WDD 231", category: "WDD" }
];

const container = document.getElementById("courseContainer");

function displayCourses(filter = "All") {
  container.innerHTML = "";

  const filtered = filter === "All" ? courses : courses.filter(c => c.category === filter);

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.textContent = course.name;
    container.appendChild(card);
  });
}

document.getElementById("allBtn").addEventListener("click", () => displayCourses("All"));
document.getElementById("cseBtn").addEventListener("click", () => displayCourses("CSE"));
document.getElementById("wddBtn").addEventListener("click", () => displayCourses("WDD"));
document.getElementById('courseCount').textContent = `The total number of courses listed below is ${courses.length}`;

// Display all by default on load
displayCourses();
