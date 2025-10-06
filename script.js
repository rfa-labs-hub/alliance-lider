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
    const heroTitle = document.querySelector('.hero-title-overlay .hero-title');
    const heroButton = document.querySelector('.hero-button-overlay .hero-button');
    const collageItems = document.querySelectorAll('.hero-collage .hero-collage-item');

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

    // Animate collage items with staggered delays
    collageItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, 1200 + (index * 100));
    });
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
});

window.addEventListener('scroll', animateOnScroll);

// Title position is now handled by CSS only - no JavaScript manipulation needed

// Preload images when page loads
window.addEventListener('load', preloadImages);

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

