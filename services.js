// Services Page JavaScript

let autoCloseTimer;
let isHovered = false;

// Initialize services page
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesPage();
});

function initializeServicesPage() {
    const panel = document.getElementById('categoriesPanel');
    const categoryItems = document.querySelectorAll('.category-item');
    const contentCard = document.querySelector('.content-card');
    
    // Show content card with animation
    setTimeout(() => {
        contentCard.classList.add('show');
    }, 300);
    
    // Start with panel open
    panel.classList.remove('collapsed');
    
    // Auto-close panel after 1.5 seconds if not hovered
    startAutoCloseTimer();
    
    // Panel hover events
    panel.addEventListener('mouseenter', function() {
        isHovered = true;
        clearTimeout(autoCloseTimer);
        panel.classList.remove('collapsed', 'animate-attention');
    });
    
    panel.addEventListener('mouseleave', function() {
        isHovered = false;
        panel.classList.add('collapsed');
        // Start attention animation after a short delay
        setTimeout(() => {
            if (panel.classList.contains('collapsed')) {
                panel.classList.add('animate-attention');
            }
        }, 100);
    });
    
    // Category click events
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            selectCategory(category);
        });
    });
    
    // Initialize theme
    updateTheme();
    
    // Initialize dropdown menus
    initDropdownMenus();
    
    // Handle cross-page navigation
    handleCrossPageNavigation();
    
    // Initialize active navigation
    setTimeout(() => {
        initActiveNavigation();
    }, 100);
    
    // Initialize Yandex Map for services page
    initServicesYandexMap();
}

function startAutoCloseTimer() {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = setTimeout(() => {
        const panel = document.getElementById('categoriesPanel');
        if (!isHovered && panel) {
            panel.classList.add('collapsed');
            // Start attention animation after auto-close
            setTimeout(() => {
                if (panel.classList.contains('collapsed')) {
                    panel.classList.add('animate-attention');
                }
            }, 100);
        }
    }, 1500); // Закрывается через 1.5 секунды если не наведена мышь
}

function selectCategory(category) {
    // Remove active class from all items
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected item
    const selectedItem = document.querySelector(`[data-category="${category}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
    }
    
    // Show content
    showCategoryContent(category);
}

function showCategoryContent(category) {
    const placeholder = document.getElementById('contentPlaceholder');
    const content = document.getElementById('categoryContent');
    const title = document.getElementById('contentTitle');
    const body = document.getElementById('contentBody');
    
    // Hide placeholder
    placeholder.style.display = 'none';
    
    // Set title
    const categoryNames = {
        'promotions': 'Акции и скидки',
        'labor-protection': 'Обучение охране труда',
        'electrical-safety': 'Электробезопасность',
        'height-work': 'Работы на высоте',
        'confined-spaces': 'Работы в ограниченных и замкнутых пространствах',
        'fire-safety': 'Пожарная безопасность',
        'industrial-safety': 'Промышленная безопасность',
        'worker-professions': 'Обучение на рабочие профессии',
        'civil-defense': 'Гражданская оборона',
        'sro': 'СРО (строительство, реконструкция)',
        'risk-assessment': 'Оценка профрисков',
        'accident-investigation': 'Расследование несчастных случаев'
    };
    
    title.textContent = categoryNames[category] || 'Категория услуг';
    
    // Set content based on category
    if (category === 'worker-professions') {
        body.innerHTML = generateWorkerProfessionsTable();
    } else if (category === 'promotions') {
        body.innerHTML = generatePromotionsContent();
    } else {
        body.innerHTML = '<p>Информация по данной категории будет добавлена в ближайшее время.</p>';
    }
    
    // Show content with smooth animation
    content.style.display = 'block';
    content.classList.add('show');
    
    // Reset and animate title and body
    title.style.opacity = '0';
    title.style.transform = 'translateX(-20px)';
    body.style.opacity = '0';
    body.style.transform = 'translateX(-20px)';
    
    // Force reflow
    content.offsetHeight;
    
    // Animate in
    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transform = 'translateX(0)';
        body.style.opacity = '1';
        body.style.transform = 'translateX(0)';
    }, 10);
}

function generatePromotionsContent() {
    return `
        <div class="promotions-section">
            <div class="promotion-card">
                <h3 class="promotion-title">Акция "Повторное обращение"</h3>
                <div class="promotion-content">
                    <p>При повторном заказе услуг скидка <strong>10%</strong></p>
                    <p>Если вы ранее обращались к нам за услугами по обучению и получению допуска, при повторном обращении мы предоставляем скидку 10% на все услуги.</p>
                </div>
            </div>
            
            <div class="promotion-card">
                <h3 class="promotion-title">Акция "Договор на год"</h3>
                <div class="promotion-content">
                    <p>При заключении договора о сотрудничестве на 1 год предоставляется скидка <strong>10%</strong> на услуги</p>
                    <p>Оформите долгосрочное сотрудничество с нами и получите постоянную скидку 10% на все услуги. Это выгодно для компаний, которые регулярно проводят обучение своих сотрудников.</p>
                </div>
            </div>
        </div>
    `;
}

function generateWorkerProfessionsTable() {
    const professions = [
        { name: 'Монтажник по монтажу стальных и железобетонных конструкций', price: '3500 руб' },
        { name: 'Стропальщик', price: '3500 руб' },
        { name: 'Обучение безопасным методам и приемам выполнения работ на высоте (1, 2, 3 группа), 20 часов', price: '1500 руб' },
        { name: 'Бетонщик', price: '3500 руб' },
        { name: 'Электрогазосварщик', price: '3500 руб' },
        { name: 'Эксплуатация и ремонт грузоподъемных машин и механизмов (для рабочих люльки на подъемнике/вышке)', price: '3500 руб' },
        { name: 'Машинист подъемника строительного', price: '3500 руб' },
        { name: 'Маляр', price: '3500 руб' },
        { name: 'Маляр (штукатур)', price: '3500 руб' },
        { name: 'Облицовщик-плиточник', price: '3500 руб' },
        { name: 'Монтажник наружных трубопроводов', price: '3500 руб' }
    ];
    
    let tableHTML = `
        <p>Мы предлагаем обучение по следующим рабочим профессиям:</p>
        <table class="services-table">
            <thead>
                <tr>
                    <th>Название профессии</th>
                    <th>Стоимость</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    professions.forEach(profession => {
        tableHTML += `
            <tr>
                <td>${profession.name}</td>
                <td>${profession.price}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    return tableHTML;
}

// Active Navigation initialization
function initActiveNavigation() {
    const currentPage = window.location.pathname;
    const currentFile = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    console.log('Services page - Current page:', currentPage);
    console.log('Services page - Current file:', currentFile);
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        console.log('Services page - Checking link:', linkHref);
        
        // Determine if this link should be active
        let isActive = false;
        
        // Check for services page
        if (currentFile === 'services.html' || currentPage.includes('services.html')) {
            if (linkHref === 'services.html' || linkHref === './services.html') {
                isActive = true;
                console.log('Services page - Activating services link');
            }
        }
        // Check for main page (index.html, root, or empty)
        else if (currentFile === 'index.html' || currentFile === '' || currentPage === '/' || currentPage.endsWith('/')) {
            if (linkHref === 'index.html' || linkHref === './index.html' || linkHref === '/') {
                isActive = true;
                console.log('Services page - Activating main page link');
            }
        }
        
        if (isActive) {
            link.classList.add('active');
            console.log('Services page - Link activated:', linkHref);
        }
    });
}

// Theme toggle functionality (inherited from main script)
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector('.header');
    
    // Add transition class for smooth theme switching
    body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    header.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    
    body.classList.toggle('dark-theme');
    header.classList.toggle('dark-theme');
    
    // Update theme-specific elements
    updateTheme();
    
    // Remove transition after animation completes
    setTimeout(() => {
        body.style.transition = '';
        header.style.transition = '';
    }, 400);
}

function updateTheme() {
    // Update icon colors based on theme
    const icons = document.querySelectorAll('.category-icon img');
    icons.forEach(icon => {
        if (document.body.classList.contains('dark-theme')) {
            icon.style.filter = 'brightness(0) invert(1)';
        } else {
            icon.style.filter = 'none';
        }
    });
}

// Yandex Map initialization for services page
function initServicesYandexMap() {
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
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const navLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Desktop hover behavior
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                dropdown.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('active');
            }
        });
        
        // Mobile click behavior
        navLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
        
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
                        // Same page, handle service category selection
                        e.preventDefault();
                        handleServiceCategorySelection(section);
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

// Handle service category selection
function handleServiceCategorySelection(categoryId) {
    // Map category IDs to data-category values
    const categoryMap = {
        'promotions': 'promotions',
        'labor-protection': 'labor-protection',
        'electrical-safety': 'electrical-safety',
        'height-work': 'height-work',
        'confined-spaces': 'confined-spaces',
        'fire-safety': 'fire-safety',
        'industrial-safety': 'industrial-safety',
        'worker-professions': 'worker-professions',
        'civil-defense': 'civil-defense',
        'sro': 'sro',
        'risk-assessment': 'risk-assessment',
        'accident-investigation': 'accident-investigation'
    };
    
    const category = categoryMap[categoryId];
    if (category) {
        selectCategory(category);
    }
}

// Handle cross-page navigation with auto-scroll
function handleCrossPageNavigation() {
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        setTimeout(() => {
            handleServiceCategorySelection(sectionId);
        }, 100);
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const requisitesModal = document.getElementById('requisitesModal');
    
    if (event.target === requisitesModal) {
        closeRequisitesModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeRequisitesModal();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close all dropdowns on resize to prevent layout issues
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    const scrollThreshold = 50;

    if (scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
