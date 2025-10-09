// Preloader functionality
let preloaderProgress = 0;
let preloaderInterval;
let isReturningVisitor = false;

// Check if user is returning visitor
function checkReturningVisitor() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    if (lastVisit && (now - parseInt(lastVisit)) < oneDay) {
        isReturningVisitor = true;
    }
    
    localStorage.setItem('lastVisit', now.toString());
}

// Simulate realistic loading progress
function simulateLoading() {
    const progressBar = document.getElementById('preloaderProgressBar');
    const percentageElement = document.getElementById('preloaderPercentage');
    
    if (!progressBar || !percentageElement) return;
    
    // Realistic loading curve - starts slow, accelerates, then slows down at the end
    const loadingSteps = [
        { progress: 15, delay: 200 },
        { progress: 28, delay: 300 },
        { progress: 42, delay: 250 },
        { progress: 58, delay: 200 },
        { progress: 73, delay: 180 },
        { progress: 85, delay: 150 },
        { progress: 94, delay: 200 },
        { progress: 100, delay: 300 }
    ];
    
    let currentStep = 0;
    
    function updateProgress() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            preloaderProgress = step.progress;
            
            progressBar.style.width = preloaderProgress + '%';
            percentageElement.textContent = preloaderProgress + '%';
            
            currentStep++;
            
            if (currentStep < loadingSteps.length) {
                setTimeout(updateProgress, step.delay);
            } else {
                // Loading complete, hide preloader after a short delay
                setTimeout(hidePreloader, 500);
            }
        }
    }
    
    // Start loading simulation
    setTimeout(updateProgress, 500);
}

// Hide preloader with smooth animation
function hidePreloader() {
    console.log('hidePreloader called');
    const preloader = document.getElementById('preloader');
    if (preloader) {
        console.log('Preloader found, adding fade-out class');
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            console.log('Preloader animation complete, hiding and initializing main page');
            preloader.style.display = 'none';
            // Initialize main page animations
            initMainPageAnimations();
            // Start hero image animation after preloader is hidden
            startHeroImageAnimation();
        }, 800);
    } else {
        console.error('Preloader element not found!');
    }
}

// Initialize main page animations after preloader
function initMainPageAnimations() {
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize other page elements
    updateActiveMenuItem();
    initActiveNavigation();
    
    // Add click event to button
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', handleButtonClick);
    }
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Initialize callback button position
    setTimeout(() => {
        handleCallbackButtonTransform();
    }, 100);
}

// Function to reset hero animation (for testing)
function resetHeroAnimation() {
    sessionStorage.removeItem('heroImageAnimated');
    console.log('Hero animation reset - will animate on next page load');
}

// Clear sessionStorage on page load to ensure fresh animation
function clearAnimationFlags() {
    sessionStorage.removeItem('heroImageAnimated');
    console.log('Cleared animation flags from sessionStorage');
}

// Function to test hero animation immediately (for testing)
function testHeroAnimationNow() {
    console.log('Testing hero animation immediately...');
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        console.log('Hero image found, starting test animation');
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateY(10px) scale(1.05)';
        setTimeout(() => {
            animateHeroImage(heroImage, 2000);
        }, 100);
    } else {
        console.error('Hero image not found for testing');
    }
}

// Function to test hero animation immediately (for testing)
function testHeroAnimation() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        console.log('Testing hero animation...');
        console.log('Element found:', heroImage);
        console.log('Element styles:', {
            opacity: window.getComputedStyle(heroImage).opacity,
            transform: window.getComputedStyle(heroImage).transform,
            display: window.getComputedStyle(heroImage).display,
            visibility: window.getComputedStyle(heroImage).visibility
        });
        
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateY(20px) scale(0.8)';
        heroImage.style.border = '5px solid red'; // Very visible border
        
        setTimeout(() => {
            animateHeroImage(heroImage, 2000);
        }, 100);
    } else {
        console.error('Hero image element not found!');
    }
}

// Function to check if hero image element exists and is visible
function checkHeroImage() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        console.log('Hero image element found:', heroImage);
        console.log('Element position:', heroImage.getBoundingClientRect());
        console.log('Element computed styles:', {
            opacity: window.getComputedStyle(heroImage).opacity,
            transform: window.getComputedStyle(heroImage).transform,
            display: window.getComputedStyle(heroImage).display,
            visibility: window.getComputedStyle(heroImage).visibility,
            zIndex: window.getComputedStyle(heroImage).zIndex
        });
        return true;
    } else {
        console.error('Hero image element not found!');
        return false;
    }
}

// Simple and visible hero image animation for testing
function animateHeroImage(element, duration = 2000) {
    console.log('animateHeroImage called with element:', element);
    console.log('Element position:', element.getBoundingClientRect());
    console.log('Animation duration:', duration);
    
    const startTime = performance.now();
    let frameCount = 0;
    
    function animate(currentTime) {
        frameCount++;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Simple linear animation for testing
        const currentOpacity = progress;
        const currentY = 10 * (1 - progress); // Move from 10px down to 0
        const currentScale = 1.05 - (0.05 * progress); // Scale from 1.05 to 1.0
        
        // Apply styles with visible effects
        element.style.opacity = currentOpacity;
        element.style.transform = `translateY(${currentY}px) scale(${currentScale})`;
        
        // Log progress every 20 frames for less spam
        if (frameCount % 20 === 0) {
            console.log(`Animation progress: ${(progress * 100).toFixed(1)}% - opacity: ${currentOpacity.toFixed(2)}, transform: translateY(${currentY.toFixed(1)}px) scale(${currentScale.toFixed(2)})`);
        }
        
        // Continue animation if not finished
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            console.log('Hero image animation completed!');
            // Final state
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }
    }
    
    console.log('Starting requestAnimationFrame loop');
    requestAnimationFrame(animate);
}

// Start hero image animation after preloader
function startHeroImageAnimation() {
    console.log('startHeroImageAnimation called');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        console.log('Hero image element found:', heroImage);
        console.log('Current hero image styles:', {
            opacity: window.getComputedStyle(heroImage).opacity,
            transform: window.getComputedStyle(heroImage).transform,
            display: window.getComputedStyle(heroImage).display
        });
        
        // Always animate hero image after preloader (remove sessionStorage check)
        console.log('Starting hero image animation after preloader');
        
        // Set initial state
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateY(10px) scale(1.05)';
        heroImage.style.animation = 'none';
        
        console.log('Set initial state, starting animation in 100ms');
        
        // Start JavaScript animation
        setTimeout(() => {
            console.log('Starting animateHeroImage function');
            animateHeroImage(heroImage, 1600);
        }, 100);
    } else {
        console.error('Hero image element not found!');
    }
}

// Initialize preloader
function initPreloader() {
    checkReturningVisitor();
    
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    if (isReturningVisitor) {
        // For returning visitors, show preloader for only 0.5 seconds
        setTimeout(() => {
            const progressBar = document.getElementById('preloaderProgressBar');
            const percentageElement = document.getElementById('preloaderPercentage');
            
            if (progressBar && percentageElement) {
                progressBar.style.width = '100%';
                percentageElement.textContent = '100%';
            }
            
            setTimeout(hidePreloader, 200);
        }, 500);
    } else {
        // For new visitors, simulate full loading
        simulateLoading();
    }
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector('.header');
    const heroImage = document.querySelector('.hero-image');
    
    // Add transition class for smooth theme switching
    body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    header.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    
    // Ensure hero image doesn't re-animate on theme change
    if (heroImage) {
        heroImage.style.animation = 'none';
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateY(0) scale(1)';
    }
    
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
    const heroImage = document.querySelector('.hero-image');

    console.log('Initializing hero animations...');
    console.log('Hero title element:', heroTitle);
    console.log('Hero button element:', heroButton);
    console.log('Hero collage element:', heroCollage);
    console.log('Hero image element:', heroImage);
    console.log('Collage items count:', collageItems.length);
    
    // Hero image animation is now handled separately in startHeroImageAnimation()
    
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
            // Collage element not found - probably on services page
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
            // Title element not found - probably on services page
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

    // Animate about section elements
    animateAboutSection();
    
    // Animate trust section elements
    animateTrustSection();
    
    // Animate trust us section elements
    animateTrustUsSection();
    
    // Animate staff section elements
    animateStaffSection();
    
    // Animate documents section elements
    animateDocumentsSection();
    
    // Animate footer elements
    animateFooter();
}

// Animate about section elements
function animateAboutSection() {
    const aboutTitle = document.querySelector('.about-title');
    const aboutIntro = document.querySelector('.about-intro');
    const aboutButton = document.querySelector('.about-more-button');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutTitle) {
        const aboutSection = document.querySelector('.about-section');
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const sectionVisible = 200;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            // Animate section container
            aboutSection.classList.add('animate');
            
            // Animate title first
            setTimeout(() => {
                aboutTitle.classList.add('animate');
            }, 200);
            
            // Animate intro text
            setTimeout(() => {
                if (aboutIntro) aboutIntro.classList.add('animate');
            }, 400);
            
            // Animate button
            setTimeout(() => {
                if (aboutButton) aboutButton.classList.add('animate');
            }, 600);
            
            // Animate image
            setTimeout(() => {
                if (aboutImage) aboutImage.classList.add('animate');
            }, 800);
        }
    }
}

// Animate trust section elements
function animateTrustSection() {
    const trustTitle = document.querySelector('.trust-title');
    const trustItems = document.querySelectorAll('.trust-item');
    
    if (trustTitle) {
        const trustSection = document.querySelector('.trust-section');
        const sectionTop = trustSection.getBoundingClientRect().top;
        const sectionVisible = 200;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            // Animate section container
            trustSection.classList.add('animate');
            
            // Animate title first
            setTimeout(() => {
                trustTitle.classList.add('animate');
            }, 200);
            
            // Animate items with staggered delays (0.1s between each)
            trustItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, 400 + (index * 100)); // 100ms = 0.1s delay between items
            });
        }
    }
}

// Animate trust us section elements
function animateTrustUsSection() {
    const trustUsTitle = document.querySelector('.trust-us-title');
    const trustUsItems = document.querySelectorAll('.trust-us-item');
    
    if (trustUsTitle) {
        const trustUsSection = document.querySelector('.trust-us-section');
        const sectionTop = trustUsSection.getBoundingClientRect().top;
        const sectionVisible = 200;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            // Animate section container
            trustUsSection.classList.add('animate');
            
            // Animate title first
            setTimeout(() => {
                trustUsTitle.classList.add('animate');
            }, 200);
            
            // Animate items with staggered delays (0.1s between each)
            trustUsItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, 400 + (index * 100)); // 100ms = 0.1s delay between items
            });
        }
    }
}

// Animate staff section elements
function animateStaffSection() {
    const staffTitle = document.querySelector('.staff-title');
    const staffCards = document.querySelectorAll('.staff-card');
    
    if (staffTitle) {
        const staffSection = document.querySelector('.staff-section');
        const sectionTop = staffSection.getBoundingClientRect().top;
        const sectionVisible = 200;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            // Animate section container
            staffSection.classList.add('animate');
            
            // Animate title first
            setTimeout(() => {
                staffTitle.classList.add('animate');
            }, 200);
            
            // Animate cards with staggered delays (0.15s between each)
            staffCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, 400 + (index * 150)); // 150ms = 0.15s delay between cards
            });
        }
    }
}

// Animate documents section elements
function animateDocumentsSection() {
    const documentsTitle = document.querySelector('.documents-title');
    const documentCards = document.querySelectorAll('.document-card');
    
    if (documentsTitle) {
        const documentsSection = document.querySelector('.documents-section');
        const sectionTop = documentsSection.getBoundingClientRect().top;
        const sectionVisible = 200;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            // Animate section container
            documentsSection.classList.add('animate');
            
            // Animate title first
            setTimeout(() => {
                documentsTitle.classList.add('animate');
            }, 200);
            
            // Animate cards with staggered delays
            documentCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, 400 + (index * 100));
            });
        }
    }
}

// Animate footer elements
function animateFooter() {
    const footer = document.querySelector('.footer');
    
    if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const footerVisible = 200;
        
        if (footerTop < window.innerHeight - footerVisible) {
            footer.classList.add('animate');
        }
    }
}

// Document Modal Functions
let currentDocumentName = '';

function openDocumentModal(documentName) {
    currentDocumentName = documentName;
    const modal = document.getElementById('documentModal');
    const iframe = document.getElementById('documentIframe');
    
    // Map document names to file names
    const documentMap = {
        'ИНН': 'ИНН.pdf',
        'Лицензия': 'Лицензия.pdf',
        'О регистрации НКО': 'О регистрации НКО.pdf',
        'Свидетельство ОРГН': 'Свидетельство ОРГН.pdf',
        'уведомление об аккредитации': 'уведомление об аккредитации.pdf'
    };
    
    const fileName = documentMap[documentName];
    if (fileName) {
        iframe.src = `images/docs/${fileName}`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Trigger animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeDocumentModal() {
    const modal = document.getElementById('documentModal');
    const iframe = document.getElementById('documentIframe');
    
    modal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        iframe.src = ''; // Clear iframe source
        document.body.style.overflow = 'auto';
    }, 300);
}

function downloadDocument() {
    if (currentDocumentName) {
        const documentMap = {
            'ИНН': 'ИНН.pdf',
            'Лицензия': 'Лицензия.pdf',
            'О регистрации НКО': 'О регистрации НКО.pdf',
            'Свидетельство ОРГН': 'Свидетельство ОРГН.pdf',
            'уведомление об аккредитации': 'уведомление об аккредитации.pdf'
        };
        
        const fileName = documentMap[currentDocumentName];
        if (fileName) {
            // Create a temporary link to download the file
            const link = document.createElement('a');
            link.href = `images/docs/${fileName}`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
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
    console.log('Page loaded, initializing...');
    
    // Clear animation flags to ensure fresh animation
    clearAnimationFlags();
    
    // Prevent any auto-scroll
    if (window.scrollY > 0) {
        window.scrollTo(0, window.scrollY);
    }
    
    // Initialize preloader first
    initPreloader();
    
    // Also initialize after a short delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('Delayed initialization...');
        // Preloader will handle main page initialization
    }, 200);
});

// Additional initialization for Chrome compatibility
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready - Chrome compatibility check');
    
    // Force re-initialization of dropdowns after a delay
    setTimeout(() => {
        console.log('Re-initializing dropdowns for Chrome...');
        initDropdownMenus();
    }, 100);
});

window.addEventListener('scroll', () => {
    animateOnScroll();
    handleParallax();
    handleHeaderScroll();
    // Force callback button check on scroll
    handleCallbackButtonTransform();
});

// Header scroll effect with glassmorphism
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    const scrollY = window.scrollY;
    const scrollThreshold = 50; // Start effect after 50px scroll

    if (scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active menu item based on scroll position
    updateActiveMenuItem();
    
    // Handle callback button transformation
    handleCallbackButtonTransform();
}

// Callback button transformation logic
function handleCallbackButtonTransform() {
    const callbackButton = document.querySelector('.callback-round-button');
    const callbackContainer = document.querySelector('.callback-button-container');
    const heroSection = document.querySelector('.hero');
    
    if (!callbackButton || !heroSection) return;
    
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const heroBottom = heroSection.offsetTop + heroHeight;
    const isMobile = window.innerWidth <= 768;
    
    // Check if hero section is out of view (more sensitive trigger)
    const shouldAttach = scrollY > (heroBottom - 200);
    
    console.log('Scroll check:', {
        scrollY: scrollY,
        heroBottom: heroBottom,
        shouldAttach: shouldAttach,
        isMobile: isMobile
    });
    
    if (shouldAttach) {
        // Create attached button if it doesn't exist
        let attachedButton = document.querySelector('.callback-attached-button');
        if (!attachedButton) {
            attachedButton = callbackButton.cloneNode(true);
            attachedButton.classList.remove('callback-round-button');
            attachedButton.classList.add('callback-attached-button');
            attachedButton.onclick = callbackButton.onclick;
            
            // Replace text with phone icon
            attachedButton.innerHTML = '<i class="ph ph-phone"></i>';
            
            document.body.appendChild(attachedButton);
            console.log('Created attached button with phone icon');
        }
        
        // Hide original button
        callbackButton.style.display = 'none';
        
        // Show attached button with appropriate class
        attachedButton.style.display = 'flex';
        if (isMobile) {
            attachedButton.classList.remove('attached');
            attachedButton.classList.add('mobile-attached');
            console.log('Added mobile-attached class');
        } else {
            attachedButton.classList.remove('mobile-attached');
            attachedButton.classList.add('attached');
            console.log('Added attached class');
        }
    } else {
        // Show original button
        callbackButton.style.display = 'flex';
        
        // Hide attached button with animation
        const attachedButton = document.querySelector('.callback-attached-button');
        if (attachedButton) {
            // Add disappearing animation
            attachedButton.classList.add('disappearing');
            
            // Remove button after animation completes
            setTimeout(() => {
                attachedButton.remove();
                console.log('Removed attached button');
            }, 800);
        }
        
        console.log('Removed all attached classes');
    }
}

// Update active menu item based on scroll position
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Only update section-based navigation if we're on the main page
    const currentFile = window.location.pathname.split('/').pop();
    if (currentFile === 'index.html' || currentFile === '' || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Only remove active class from section links, not page links
            if (linkHref && linkHref.startsWith('#')) {
                link.classList.remove('active');
                if (linkHref === `#${currentSection}`) {
                    link.classList.add('active');
                }
            }
        });
        
        // If no section is active, make the first section link active
        if (!currentSection && window.scrollY < 100) {
            const firstSectionLink = document.querySelector('.nav-menu a[href^="#"]');
            if (firstSectionLink) {
                firstSectionLink.classList.add('active');
            }
        }
    }
}

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
    // Preloader will handle main page initialization
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
        
        // Close all dropdowns on resize to prevent layout issues
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        console.log('Closed all dropdowns on resize');
        
        // Recalculate callback button position on resize
        handleCallbackButtonTransform();
    }, 250);
});

// Callback Modal Functions
function openCallbackModal() {
    const modal = document.getElementById('callbackModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeCallbackModal() {
    const modal = document.getElementById('callbackModal');
    modal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300);
}


// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const callbackModal = document.getElementById('callbackModal');
    const aboutModal = document.getElementById('aboutModal');
    const documentModal = document.getElementById('documentModal');
    const requisitesModal = document.getElementById('requisitesModal');
    
    if (event.target === callbackModal) {
        closeCallbackModal();
    }
    
    if (event.target === aboutModal) {
        closeAboutModal();
    }
    
    if (event.target === documentModal) {
        closeDocumentModal();
    }
    
    if (event.target === requisitesModal) {
        closeRequisitesModal();
    }
});

// About Modal Functions
function openAboutModal() {
    const modal = document.getElementById('aboutModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeAboutModal() {
    const modal = document.getElementById('aboutModal');
    modal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300);
}

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCallbackModal();
        closeAboutModal();
        closeDocumentModal();
        closeRequisitesModal();
    }
});

// Custom Select Functionality
function initCustomSelect() {
    const customSelect = document.querySelector('.custom-select');
    const originalSelect = document.querySelector('#callbackReason');
    const options = document.querySelectorAll('.custom-option');
    
    if (!customSelect || !originalSelect) return;
    
    // Create trigger element
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.innerHTML = `
        <span class="custom-select-value">Выберите цель</span>
        <div class="custom-select-arrow"></div>
    `;
    
    // Insert trigger before options
    customSelect.insertBefore(trigger, customSelect.querySelector('.custom-select-options'));
    
    // Handle trigger click
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('open');
        const optionsContainer = customSelect.querySelector('.custom-select-options');
        optionsContainer.style.display = customSelect.classList.contains('open') ? 'block' : 'none';
    });
    
    // Handle option clicks
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = option.getAttribute('data-value');
            const text = option.textContent;
            
            // Update trigger text
            trigger.querySelector('.custom-select-value').textContent = text;
            
            // Update original select
            originalSelect.value = value;
            
            // Update selected state
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            // Close dropdown
            customSelect.classList.remove('open');
            customSelect.querySelector('.custom-select-options').style.display = 'none';
            
            // Trigger change event
            originalSelect.dispatchEvent(new Event('change'));
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
            customSelect.querySelector('.custom-select-options').style.display = 'none';
        }
    });
}

// Requisites Modal Functions
function openRequisitesModal() {
    const modal = document.getElementById('requisitesModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeRequisitesModal() {
    const modal = document.getElementById('requisitesModal');
    modal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300);
}

// Dropdown Menu Functionality
function initDropdownMenus() {
    console.log('Initializing dropdown menus...');
    const dropdowns = document.querySelectorAll('.dropdown');
    console.log('Found dropdowns:', dropdowns.length);
    
    // Ensure all dropdowns are closed on initialization
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            console.log('Dropdown menu found, ensuring it\'s hidden');
            // Force hide dropdown menu for Chrome compatibility
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
        }
    });
    
    dropdowns.forEach(dropdown => {
        const navLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Desktop hover behavior
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                dropdown.classList.add('active');
                // Reset inline styles to allow CSS to take over
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '';
                    dropdownMenu.style.visibility = '';
                    dropdownMenu.style.transform = '';
                }
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('active');
            }
        });
        
        // Mobile click behavior - only for dropdown items
        if (dropdown) {
            navLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Reset inline styles for mobile
                    if (dropdownMenu) {
                        dropdownMenu.style.opacity = '';
                        dropdownMenu.style.visibility = '';
                        dropdownMenu.style.transform = '';
                    }
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
        
        // Handle dropdown link clicks
        const dropdownLinks = dropdownMenu.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Handle cross-page navigation with auto-scroll
                if (href && href.includes('#')) {
                    const [page, section] = href.split('#');
                    const currentPage = window.location.pathname.split('/').pop();
                    
                    if (page && page !== '' && page !== currentPage) {
                        // Navigate to different page with section
                        e.preventDefault();
                        window.location.href = href;
                    } else if (section) {
                        // Same page, just scroll to section
                        e.preventDefault();
                        scrollToSection(section);
                    }
                }
                
                // Close dropdown on mobile
                if (window.innerWidth <= 768) {
                    dropdown.classList.remove('active');
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 80; // Height of fixed header
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Handle cross-page navigation with auto-scroll
function handleCrossPageNavigation() {
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 100);
    }
}


// Handle form submission (placeholder for now)
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
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
    
    // Initialize custom select
    initCustomSelect();
    
    // Initialize dropdown menus
    initDropdownMenus();
    
    
    // Handle cross-page navigation
    handleCrossPageNavigation();
    
    // Initialize Yandex Map (only on main page)
    if (!document.querySelector('.services-page')) {
        initYandexMap();
    }
    
    // Initialize active navigation
    initActiveNavigation();
    
    // Debug: Add click listener to all navigation links
    const allNavLinks = document.querySelectorAll('.nav-menu a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('Navigation link clicked:', href);
            
            // If it's account.html, ensure it navigates properly
            if (href === 'account.html') {
                console.log('Account link clicked - allowing navigation');
                // Don't prevent default - let browser handle it
            }
        });
    });
});

// Active Navigation initialization
function initActiveNavigation() {
    const currentPage = window.location.pathname;
    const currentFile = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    console.log('Current page:', currentPage);
    console.log('Current file:', currentFile);
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        console.log('Checking link:', linkHref);
        
        // Determine if this link should be active
        let isActive = false;
        
        // Check for services page
        if (currentFile === 'services.html' || currentPage.includes('services.html')) {
            if (linkHref === 'services.html' || linkHref === './services.html') {
                isActive = true;
                console.log('Activating services link');
            }
        }
        // Check for account page
        else if (currentFile === 'account.html' || currentPage.includes('account.html')) {
            if (linkHref === 'account.html' || linkHref === './account.html') {
                isActive = true;
                console.log('Activating account link');
            }
        }
        // Check for main page (index.html, root, or empty)
        else if (currentFile === 'index.html' || currentFile === '' || currentPage === '/' || currentPage.endsWith('/')) {
            if (linkHref === 'index.html' || linkHref === './index.html' || linkHref === '/') {
                isActive = true;
                console.log('Activating main page link');
            }
        }
        
        if (isActive) {
            link.classList.add('active');
            console.log('Link activated:', linkHref);
        }
    });
}

// Yandex Map initialization
function initYandexMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            const map = new ymaps.Map('map', {
                center: [55.1644, 61.4368], // Координаты Челябинска
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Добавляем метку
            const placemark = new ymaps.Placemark([55.1644, 61.4368], {
                balloonContent: 'АНО ДПО УЦ «Альянс-Лидер»<br>г. Челябинск, ул. Культуры, д. 77'
            }, {
                preset: 'islands#redDotIcon',
                iconColor: '#d45319'
            });

            map.geoObjects.add(placemark);
        });
    } else {
        console.log('Yandex Maps API not loaded');
    }
}

