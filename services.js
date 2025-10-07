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
    
    // Auto-close panel after 1.5 seconds
    startAutoCloseTimer();
    
    // Panel hover events
    panel.addEventListener('mouseenter', function() {
        isHovered = true;
        clearTimeout(autoCloseTimer);
        panel.classList.remove('collapsed');
    });
    
    panel.addEventListener('mouseleave', function() {
        isHovered = false;
        startAutoCloseTimer();
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
    
    // Initialize Yandex Map
    initYandexMap();
}

function startAutoCloseTimer() {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = setTimeout(() => {
        if (!isHovered) {
            const panel = document.getElementById('categoriesPanel');
            panel.classList.add('collapsed');
        }
    }, 1500);
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
    } else {
        body.innerHTML = '<p>Информация по данной категории будет добавлена в ближайшее время.</p>';
    }
    
    // Reset animations
    content.classList.remove('show');
    title.style.opacity = '0';
    title.style.transform = 'translateX(-20px)';
    body.style.opacity = '0';
    body.style.transform = 'translateX(-20px)';
    
    // Show content with animation
    content.style.display = 'block';
    setTimeout(() => {
        content.classList.add('show');
        // Force reflow to ensure content is visible
        content.offsetHeight;
    }, 50);
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
