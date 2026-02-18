const weekDiv = document.getElementById("week");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const program7Hari = [
  { day: "Hari 1", workouts: ["Stretching", "Jalan santai"] },
  { day: "Hari 2", workouts: ["Core ringan", "Squat / Push-up"] },
  { day: "Hari 3", workouts: ["Yoga", "Jalan cepat"] },
  { day: "Hari 4", workouts: ["Upper body", "Stretching"] },
  { day: "Hari 5", workouts: ["Core & Balance", "Cardio ringan"] },
  { day: "Hari 6", workouts: ["Full body", "Mobility"] },
  { day: "Hari 7", workouts: ["Recovery", "Stretching santai"] }
];

function loadState() {
  return JSON.parse(localStorage.getItem("ramadhan-progress") || "{}");
}

function saveState(state) {
  localStorage.setItem("ramadhan-progress", JSON.stringify(state));
}

function updateProgress() {
  const state = loadState();
  const total = program7Hari.reduce((sum, d) => sum + d.workouts.length, 0);
  const done = Object.values(state).filter(v => v).length;

  const percent = Math.round((done / total) * 100);

  progressFill.style.width = percent + "%";
  progressText.textContent = percent + "%";
}

function render() {
  const state = loadState();
  weekDiv.innerHTML = "";

  program7Hari.forEach((d, dayIndex) => {
    const dayEl = document.createElement("div");
    dayEl.className = "day";

    let workoutsHTML = `<div class="day-title">${d.day}</div>`;

    d.workouts.forEach((w, i) => {
      const key = `${dayIndex}-${i}`;
      const checked = state[key] ? "checked" : "";

      workoutsHTML += `
        <label class="workout">
          <input type="checkbox" data-key="${key}" ${checked}>
          ${w}
        </label>
      `;
    });

    dayEl.innerHTML = workoutsHTML;
    weekDiv.appendChild(dayEl);
  });

  document.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", e => {
      const key = e.target.dataset.key;
      const state = loadState();
      state[key] = e.target.checked;
      saveState(state);
      updateProgress();
    });
  });

  updateProgress();
}

render();
