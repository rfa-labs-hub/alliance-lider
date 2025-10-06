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
    const heroTitle = document.querySelector('.hero-title-overlay .hero-title');
    const heroButton = document.querySelector('.hero-button-overlay .hero-button');
    const heroCollage = document.querySelector('.hero-collage');
    const collageItems = document.querySelectorAll('.hero-collage .hero-collage-item');
    const callbackButtonContainer = document.querySelector('.callback-button-container');

    console.log('Initializing hero animations...');
    console.log('Hero title element:', heroTitle);
    console.log('Hero button element:', heroButton);
    console.log('Hero collage element:', heroCollage);
    console.log('Collage items count:', collageItems.length);
    
    // Check initial states and force them if needed
    if (heroCollage) {
        console.log('Initial collage opacity:', window.getComputedStyle(heroCollage).opacity);
        // Force initial state
        heroCollage.style.opacity = '0';
        heroCollage.style.transform = 'translateY(20px)';
    }
    if (heroTitle) {
        console.log('Initial title opacity:', window.getComputedStyle(heroTitle).opacity);
        // Force initial state
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(10px)';
    }
    if (heroButton) {
        console.log('Initial button opacity:', window.getComputedStyle(heroButton).opacity);
        // Force initial state
        heroButton.style.opacity = '0';
        heroButton.style.transform = 'translateY(10px)';
    }

    // 1. Animate collage container (fade-in + slide-up)
    setTimeout(() => {
        if (heroCollage) {
            console.log('Adding animate class to collage');
            heroCollage.classList.add('animate');
            console.log('Collage classes after animation:', heroCollage.className);
            console.log('Collage computed styles:', window.getComputedStyle(heroCollage).opacity);
        } else {
            console.log('Collage element not found');
        }
    }, 100);

    // 2. Animate collage items with staggered delays (fade-in + scale-up)
    collageItems.forEach((item, index) => {
        // Force initial state for each item
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            item.classList.add('animate');
        }, 300 + (index * 150));
    });

    // 3. Animate title (fade-in + slide-up) with delay after collage
    setTimeout(() => {
        if (heroTitle) {
            console.log('Adding animate class to title');
            heroTitle.classList.add('animate');
            console.log('Title classes after animation:', heroTitle.className);
            console.log('Title computed styles:', window.getComputedStyle(heroTitle).opacity);
        } else {
            console.log('Title element not found');
        }
    }, 1200);

    // 4. Animate button (fade-in + slide-up)
    setTimeout(() => {
        if (heroButton) {
            heroButton.classList.add('animate');
        }
    }, 1400);

    // 5. Animate callback button (fade-in-up)
    setTimeout(() => {
        if (callbackButtonContainer) {
            callbackButtonContainer.classList.add('animate');
        }
    }, 1800);
}

// Scroll animations for other elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-content, .hero-collage-item');
    
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

// Preload images to ensure they load
function preloadImages() {
    const images = [];
    // Маппинг: позиция в коллаже -> номер изображения
    const imageMapping = [
        null,    // позиция 1 - пустая
        2,       // позиция 2 - изображение 2
        3,       // позиция 3 - изображение 3
        null,    // позиция 4 - пустая
        5,       // позиция 5 - изображение 5
        6,       // позиция 6 - изображение 6
        7,       // позиция 7 - изображение 7
        8,       // позиция 8 - изображение 8
        9,       // позиция 9 - изображение 9
        10,      // позиция 10 - изображение 10
        11,      // позиция 11 - изображение 11
        12       // позиция 12 - изображение 12
    ];
    
    imageMapping.forEach((imageNumber, position) => {
        if (imageNumber !== null) {
            images.push({ 
                src: `./images/collage/${imageNumber}.jpg`, 
                position: position,
                imageNumber: imageNumber
            });
        }
    });
    
    let loadedCount = 0;
    const totalImages = images.length;
    const imageSizes = [];
    
    images.forEach((imageData) => {
        const img = new Image();
        img.onload = function() {
            loadedCount++;
            console.log(`Image ${imageData.src} loaded successfully (${loadedCount}/${totalImages}) - Size: ${img.naturalWidth}x${img.naturalHeight}`);
            
            // Store image dimensions by position
            imageSizes[imageData.position] = {
                width: img.naturalWidth,
                height: img.naturalHeight
            };
            
            // Update the corresponding collage item
            const collageItem = document.querySelector(`.hero-collage .hero-collage-item:nth-child(${imageData.position + 1})`);
            if (collageItem && !collageItem.classList.contains('empty')) {
                collageItem.style.backgroundImage = `url('${imageData.src}')`;
                // Set container size to match image aspect ratio
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                collageItem.style.aspectRatio = aspectRatio;
                console.log(`Setting background for position ${imageData.position + 1}: ${imageData.src}`);
            }
            
            // When all images are loaded, adjust grid layout
            if (loadedCount === totalImages) {
                adjustGridLayout(imageSizes);
            }
        };
        img.onerror = function() {
            console.log(`Image ${imageData.src} failed to load`);
            // Fallback: create colored div instead
            const collageItem = document.querySelector(`.hero-collage .hero-collage-item:nth-child(${imageData.position + 1})`);
            if (collageItem && !collageItem.classList.contains('empty')) {
                collageItem.style.backgroundColor = '#d45319';
                collageItem.style.backgroundImage = 'none';
            }
        };
        img.src = imageData.src;
    });
}

// Adjust grid layout based on actual image sizes
function adjustGridLayout(imageSizes) {
    console.log('All images loaded, adjusting grid layout...');
    console.log('Image sizes:', imageSizes);
    
    const collageContainer = document.querySelector('.hero-collage');
    if (!collageContainer) return;
    
    // Calculate the maximum width and height for each row
    const rows = [];
    for (let i = 0; i < 4; i++) {
        const rowImages = [];
        // Get images for this row (positions i*3, i*3+1, i*3+2)
        for (let j = 0; j < 3; j++) {
            const position = i * 3 + j;
            rowImages.push(imageSizes[position] || null);
        }
        
        // Filter out empty elements (null values)
        const validImages = rowImages.filter(img => img && img.width && img.height);
        const maxHeight = validImages.length > 0 ? Math.max(...validImages.map(img => img.height)) : 0;
        const totalWidth = validImages.reduce((sum, img) => sum + img.width, 0);
        rows.push({ maxHeight, totalWidth, images: rowImages, validImages });
    }
    
    // Calculate optimal container dimensions
    const containerWidth = collageContainer.offsetWidth - 40; // minus padding
    const containerHeight = collageContainer.offsetHeight - 40; // minus padding
    
    console.log('Collage container dimensions:', {
        offsetWidth: collageContainer.offsetWidth,
        offsetHeight: collageContainer.offsetHeight,
        containerWidth: containerWidth,
        containerHeight: containerHeight
    });
    
    // Adjust each row to fit properly
    rows.forEach((row, rowIndex) => {
        if (row.validImages.length === 0) return; // Skip empty rows
        
        const scaleFactor = Math.min(
            (containerWidth - 10) / row.totalWidth, // 10px for gaps
            (containerHeight / 4 - 5) / row.maxHeight // 5px for gaps
        );
        
        // Apply 1.3x scaling to make all images bigger
        const finalScaleFactor = scaleFactor * 1.3;
        
        // Apply scaling to each image in the row
        for (let colIndex = 0; colIndex < 3; colIndex++) {
            const position = rowIndex * 3 + colIndex;
            const collageItem = document.querySelector(`.hero-collage .hero-collage-item:nth-child(${position + 1})`);
            
            if (collageItem && row.images[colIndex] && !collageItem.classList.contains('empty')) {
                const img = row.images[colIndex];
                const scaledWidth = img.width * finalScaleFactor;
                const scaledHeight = img.height * finalScaleFactor;
                
                collageItem.style.width = `${scaledWidth}px`;
                collageItem.style.height = `${scaledHeight}px`;
                collageItem.style.aspectRatio = `${img.width} / ${img.height}`;
                
                console.log(`Image at position ${position + 1}: ${img.width}x${img.height} -> ${scaledWidth}x${scaledHeight} (1.3x scale)`);
            } else if (collageItem && collageItem.classList.contains('empty')) {
                // Set empty elements to have minimal size but maintain grid position
                collageItem.style.width = '50px';
                collageItem.style.height = '50px';
                collageItem.style.backgroundImage = 'none';
                collageItem.style.backgroundColor = 'transparent';
                console.log(`Empty slot at position ${position + 1}: set to minimal size`);
            }
        }
    });
    
    // Update grid to use fixed sizes
    collageContainer.style.gridTemplateColumns = 'repeat(3, auto)';
    collageContainer.style.gridAutoRows = 'auto';
    collageContainer.style.justifyContent = 'center';
    collageContainer.style.alignContent = 'start';
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
    
    // Also initialize after a short delay to ensure DOM is fully ready
    setTimeout(() => {
        initHeroAnimations();
    }, 200);
});

window.addEventListener('scroll', () => {
    animateOnScroll();
    handleParallax();
});

// Parallax effect for hero collage
function handleParallax() {
    const heroCollage = document.querySelector('.hero-collage');
    if (!heroCollage) return;

    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.05; // 5% slower than page scroll
    const parallaxOffset = scrolled * parallaxSpeed;
    
    heroCollage.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
    heroCollage.classList.add('parallax');
}

// Title position is now handled by CSS only - no JavaScript manipulation needed

// Preload images when page loads
window.addEventListener('load', () => {
    preloadImages();
    // Force initialize animations after a short delay
    setTimeout(() => {
        initHeroAnimations();
    }, 100);
});

// Handle window resize to recalculate layout
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate layout after resize
        const collageItems = document.querySelectorAll('.hero-collage .hero-collage-item');
        if (collageItems.length > 0) {
            // Get current image sizes from loaded images
            const imageSizes = [];
            collageItems.forEach((item, index) => {
                const bgImage = item.style.backgroundImage;
                if (bgImage && bgImage !== 'none') {
                    const img = new Image();
                    img.onload = function() {
                        imageSizes[index] = {
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        };
                        
                        // If this is the last image, recalculate layout
                        if (index === collageItems.length - 1) {
                            adjustGridLayout(imageSizes);
                        }
                    };
                    img.src = bgImage.replace(/url\(['"]?(.+?)['"]?\)/, '$1');
                }
            });
        }
    }, 250);
});

// Callback Modal Functions
function openCallbackModal() {
    const modal = document.getElementById('callbackModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeCallbackModal() {
    const modal = document.getElementById('callbackModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}


// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const callbackModal = document.getElementById('callbackModal');
    
    if (event.target === callbackModal) {
        closeCallbackModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCallbackModal();
    }
});

// Handle form submission (placeholder for now)
document.addEventListener('DOMContentLoaded', () => {
    const callbackForm = document.querySelector('.callback-form');
    if (callbackForm) {
        callbackForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Here you would normally send the data to a server
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            closeCallbackModal();
            callbackForm.reset();
        });
    }
});

