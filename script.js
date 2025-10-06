// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector('.header');
    
    // Add transition class for smooth theme switching
    body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    header.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    
    body.classList.toggle('dark-theme');
    header.classList.toggle('dark-theme');
    
    // Remove transition after animation completes
    setTimeout(() => {
        body.style.transition = '';
        header.style.transition = '';
    }, 400);
}

// Hero animations sequence
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    const heroButton = document.querySelector('.hero-button');
    const heroImage = document.querySelector('.hero-image');

    // Start animations with delays
    setTimeout(() => {
        heroContent.classList.add('animate');
    }, 300);

    setTimeout(() => {
        heroTitle.classList.add('animate');
    }, 600);

    setTimeout(() => {
        heroButton.classList.add('animate');
    }, 900);

    setTimeout(() => {
        heroImage.classList.add('animate');
    }, 1200);
}

// Scroll animations for other elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-content, .hero-image');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Button click handler
function handleButtonClick() {
    console.log('Button clicked!');
    // Здесь можно добавить логику для перехода на другую страницу или открытия модального окна
    // Например: window.location.href = '#services';
}

// Preload image to ensure it loads
function preloadImage() {
    const img = new Image();
    img.onload = function() {
        console.log('Image loaded successfully');
    };
    img.onerror = function() {
        console.log('Image failed to load');
        // Fallback: create colored div instead
        const heroImage = document.querySelector('.hero-image');
        heroImage.style.backgroundColor = '#d45319';
        heroImage.style.backgroundImage = 'none';
    };
    img.src = './images/1.jpg';
}

// Prevent auto-scroll on page load
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, window.scrollY);
});

// Initialize animations and event listeners
window.addEventListener('load', () => {
    // Prevent any auto-scroll
    if (window.scrollY > 0) {
        window.scrollTo(0, window.scrollY);
    }
    
    initHeroAnimations();
    
    // Add click event to button
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', handleButtonClick);
    }
});

window.addEventListener('scroll', animateOnScroll);

// Preload image when page loads
window.addEventListener('load', preloadImage);
