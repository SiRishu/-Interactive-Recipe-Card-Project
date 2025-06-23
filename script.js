let currentStep = 0;
let timerInterval;
let totalTime = 45 * 60; // 45 minutes in seconds

function toggleSection(id) {
  document.getElementById(id).classList.toggle("hidden");
}

function startCooking() {
  const steps = document.querySelectorAll("#steps li");
  if (steps.length === 0) return;

  currentStep = 0;
  highlightStep(steps, currentStep);

  if (!document.getElementById("next-step-btn")) {
    const nextBtn = document.createElement("button");
    nextBtn.id = "next-step-btn";
    nextBtn.textContent = "➡️ Next Step";
    nextBtn.onclick = () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        highlightStep(steps, currentStep);
      }
    };
    document.querySelector(".recipe-card").appendChild(nextBtn);
  }

  startTimer();
}

function highlightStep(steps, index) {
  steps.forEach((step, i) => {
    step.style.backgroundColor = i === index ? "#f3e5f5" : "transparent";
  });

  const progressBar = document.getElementById("progress-bar");
  progressBar.innerHTML = `<div style="width:${((index+1)/steps.length)*100}%"></div>`;
}

function startTimer() {
  clearInterval(timerInterval);
  let remainingTime = totalTime;

  timerInterval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    document.getElementById("timer").textContent = `⏳ Time Left: ${minutes}m ${seconds}s`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").textContent = "✅ Time's up!";
    }
    remainingTime--;
  }, 1000);
}
