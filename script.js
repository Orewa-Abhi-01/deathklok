let countdownInterval;
const backgroundAudio = document.getElementById("background-audio");
backgroundAudio.volume = 0.5;
const audioIcon = document.getElementById("audio-icon");

// Add toggle functionality
const audioToggle = document.getElementById("audio-toggle");
audioToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering document click
    
    if (backgroundAudio.paused) {
        backgroundAudio.play();
        audioIcon.textContent = "🔊";
    } else {
        backgroundAudio.pause();
        audioIcon.textContent = "🔇";
    }
});


const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startCountDown);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetCountDown);

function startCountDown() {
  // clear any existing interval
    backgroundAudio.play();

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  function showCountdown() {
    const currTime = new Date().getTime();
    // const deadline = new Date("2025-04-01").getTime();
    // const deadline = new Date(deadlineInput).getTime();
    const deadline = new Date(localStorage.getItem("deadline")||"2025-04-01").getTime();
    const timeLeft = deadline - currTime;

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
      alert("Countdown finished!");
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }

  // immediately start the countdown
  showCountdown();
  countdownInterval = setInterval(showCountdown, 1000);
}

startCountDown();

function resetCountDown() {
  clearInterval(countdownInterval);
  document.getElementById("days").innerText = "00";
  document.getElementById("hours").innerText = "00";
  document.getElementById("minutes").innerText = "00";
  document.getElementById("seconds").innerText = "00";
    backgroundAudio.pause();
    audioIcon.textContent = "🔇";
    localStorage.removeItem("deadline");
}

// Set the deadline in localStorage on page load (if it doesn't exist)
if (!localStorage.getItem("deadline")) {
    localStorage.setItem("deadline", "2025-04-01");
}

resetCountDown();
