document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            showError('name', 'Por favor ingresa un nombre válido');
            isValid = false;
        } else {
            clearError('name');
        }
        
        const email = document.getElementById('email').value.trim();
        if (!validateEmail(email)) {
            showError('email', 'Por favor ingresa un email válido');
            isValid = false;
        } else {
            clearError('email');
        }
        
        const subject = document.getElementById('subject').value.trim();
        if (subject.length < 3) {
            showError('subject', 'Por favor ingresa un asunto');
            isValid = false;
        } else {
            clearError('subject');
        }
        
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) {
            showError('message', 'Por favor escribe un mensaje (mínimo 10 caracteres)');
            isValid = false;
        } else {
            clearError('message');
        }
        
        if (isValid) {
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = '¡Mensaje enviado exitosamente! Te contactaremos pronto.';
            successMessage.classList.add('show');
            
            contactForm.reset();
            
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
    });

    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input.id);
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.saving-card, .option-card, .method-card, .blog-card, .value, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 968px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                flex-direction: column;
                padding: 24px;
                gap: 20px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});