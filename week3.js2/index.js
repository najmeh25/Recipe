function startCookingTimer() {
  const cookingTimeInput = document.getElementById('cookingTime').value;
  const message = document.getElementById('cookingMessage');

  if (!cookingTimeInput || cookingTimeInput.length === 0 || Number(cookingTimeInput) <= 0) {
    message.textContent = "Please enter a valid positive number.";
    return;
  }

  const cookingTime = Number(cookingTimeInput);
  message.textContent = `Cooking timer started for ${cookingTime} seconds.`;

  setTimeout(() => {
    alert("Cooking time is up!");
    message.textContent = "Time's up! Your dish is ready.";
  }, cookingTime * 1000);
}

document.getElementById('startTimerButton').addEventListener('click', startCookingTimer);

(function trackPageTime() {
  let secondsSpent = 0;

  function updatePageTime() {
    secondsSpent++;
    document.getElementById('pageTimer').textContent = `${secondsSpent} seconds`;
  }

  setInterval(updatePageTime, 1000);
})();