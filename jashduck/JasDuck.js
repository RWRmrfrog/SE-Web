const confettiContainer = document.querySelector('#confetti-container');
const showConfetti = () => {
  const confetti = document.createElement('div');
  confetti.textContent = '🎉';
  confetti.style.zIndex = "-1";
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * innerWidth + 'px';
  confettiContainer.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 4000);
};

setInterval(() => {
  showConfetti();
}, 200);