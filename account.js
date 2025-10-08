// Account Page JavaScript Functionality

// Initialize account page functionality
document.addEventListener('DOMContentLoaded', function() {
    initAccountPage();
});

function initAccountPage() {
    initTabSwitching();
    initFormValidation();
    initPasswordToggle();
    initRoleSelection();
    initFormSubmission();
}

// Tab switching functionality
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show/hide forms with animation
            if (targetTab === 'login') {
                showForm(loginForm, registerForm);
            } else if (targetTab === 'register') {
                showForm(registerForm, loginForm);
            }
        });
    });
}

// Show form with smooth animation
function showForm(showForm, hideForm) {
    // Hide current form
    hideForm.style.display = 'none';
    hideForm.classList.add('hidden');
    
    // Show new form
    setTimeout(() => {
        showForm.style.display = 'block';
        showForm.classList.remove('hidden');
    }, 200);
}

// Password toggle functionality
function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'ph ph-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'ph ph-eye';
            }
        });
    });
}

// Toggle password visibility (called from HTML)
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle');
    const icon = toggle.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ph ph-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'ph ph-eye';
    }
}

// Role selection functionality
function initRoleSelection() {
    const roleOptions = document.querySelectorAll('input[name="userRole"]');
    
    roleOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Remove active class from all role options
            document.querySelectorAll('.role-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to selected option
            this.closest('.role-option').classList.add('active');
            
            // You can add additional logic here based on selected role
            const selectedRole = this.value;
            console.log('Selected role:', selectedRole);
        });
    });
}

// Form validation
function initFormValidation() {
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm(this);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateRegisterForm(this);
        });
    }
}

// Validate login form
function validateLoginForm(form) {
    const email = form.querySelector('#loginEmail');
    const password = form.querySelector('#loginPassword');
    const rememberMe = form.querySelector('input[name="remember"]');
    
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email обязателен для заполнения');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Введите корректный email');
        isValid = false;
    }
    
    // Validate password
    if (!password.value.trim()) {
        showFieldError(password, 'Пароль обязателен для заполнения');
        isValid = false;
    } else if (password.value.length < 6) {
        showFieldError(password, 'Пароль должен содержать минимум 6 символов');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate login process
        simulateLogin(email.value, password.value, rememberMe.checked);
    }
}

// Validate registration form
function validateRegisterForm(form) {
    const fullName = form.querySelector('#registerFullName');
    const email = form.querySelector('#registerEmail');
    const password = form.querySelector('#registerPassword');
    const confirmPassword = form.querySelector('#registerConfirmPassword');
    const terms = form.querySelector('input[name="terms"]');
    
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate full name
    if (!fullName.value.trim()) {
        showFieldError(fullName, 'ФИО обязательно для заполнения');
        isValid = false;
    } else if (fullName.value.trim().length < 2) {
        showFieldError(fullName, 'ФИО должно содержать минимум 2 символа');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email обязателен для заполнения');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Введите корректный email');
        isValid = false;
    }
    
    // Validate password
    if (!password.value.trim()) {
        showFieldError(password, 'Пароль обязателен для заполнения');
        isValid = false;
    } else if (password.value.length < 6) {
        showFieldError(password, 'Пароль должен содержать минимум 6 символов');
        isValid = false;
    } else if (!isStrongPassword(password.value)) {
        showFieldError(password, 'Пароль должен содержать буквы и цифры');
        isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword.value.trim()) {
        showFieldError(confirmPassword, 'Подтверждение пароля обязательно');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, 'Пароли не совпадают');
        isValid = false;
    }
    
    // Validate terms agreement
    if (!terms.checked) {
        showFieldError(terms, 'Необходимо согласиться с условиями использования');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate registration process
        simulateRegistration(fullName.value, email.value, password.value);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password strength validation
function isStrongPassword(password) {
    // At least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
}

// Show field error
function showFieldError(field, message) {
    const wrapper = field.closest('.form-group') || field.closest('.form-options');
    if (!wrapper) return;
    
    // Remove existing error
    const existingError = wrapper.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to field
    field.classList.add('error');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    errorDiv.style.fontFamily = 'Manrope, sans-serif';
    
    // Insert error message
    wrapper.appendChild(errorDiv);
    
    // Add shake animation
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

// Clear form errors
function clearFormErrors(form) {
    const errorFields = form.querySelectorAll('.error');
    const errorMessages = form.querySelectorAll('.field-error');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
}

// Simulate login process
function simulateLogin(email, password, rememberMe) {
    const submitButton = document.querySelector('#loginFormElement .submit-button');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Вход...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Вход выполнен успешно!', 'success');
        
        // Here you would typically redirect to dashboard or main page
        // window.location.href = 'dashboard.html';
        
    }, 2000);
}

// Simulate registration process
function simulateRegistration(fullName, email, password) {
    const submitButton = document.querySelector('#registerFormElement .submit-button');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Регистрация...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Регистрация выполнена успешно!', 'success');
        
        // Switch to login tab
        const loginTab = document.querySelector('.tab-button[data-tab="login"]');
        if (loginTab) {
            loginTab.click();
        }
        
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="ph ph-${type === 'success' ? 'check-circle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 16px 20px;
        border-radius: 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-family: 'Manrope', sans-serif;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Form submission handlers
function initFormSubmission() {
    // Handle forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Функция восстановления пароля будет доступна в ближайшее время', 'info');
        });
    }
    
    // Handle terms link
    const termsLink = document.querySelector('.terms-link');
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Условия использования будут доступны в ближайшее время', 'info');
        });
    }
}

// Add shake animation CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.field-error {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}

.form-group input.error {
    border-color: #e74c3c !important;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
}

body.dark-theme .form-group input.error {
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2) !important;
}

.role-option.active {
    background-color: rgba(212, 83, 25, 0.1);
    border-color: var(--accent);
}

body.dark-theme .role-option.active {
    background-color: rgba(212, 83, 25, 0.2);
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Initialize active navigation for account page
function initAccountNavigation() {
    const currentPage = window.location.pathname;
    const currentFile = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        
        // Check for account page
        if (currentFile === 'account.html' || currentPage.includes('account.html')) {
            if (linkHref === 'account.html' || linkHref === './account.html') {
                link.classList.add('active');
            }
        }
    });
}

// Initialize when page loads
window.addEventListener('load', function() {
    initAccountNavigation();
    
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

// Handle window resize
window.addEventListener('resize', function() {
    // Close any open dropdowns on mobile
    if (window.innerWidth <= 768) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});
