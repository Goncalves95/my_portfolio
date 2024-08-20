const fernando = document.getElementById('fernando');
const headline = document.getElementById('headline');

// Create sparkles container
const sparklesContainer = document.createElement('div');
sparklesContainer.className = 'sparkles';
document.body.appendChild(sparklesContainer);

// Create sparkles
for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparklesContainer.appendChild(sparkle);
}

// Animate sparkles
function animateSparkles() {
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
        sparkle.style.animationDelay = `${index * 0.1}s`;
    });
}

animateSparkles();

// Add event listener to headline
headline.addEventListener('mouseover', () => {
    animateSparkles();
});