// Direct Philippine Beach Images (Pre-selected, Guaranteed to Work)
const heroImages = [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80', // Beach resort
    'https://images.unsplash.com/photo-1552632570-5b67b56dd298?w=1200&q=80', // Tropical beach
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'  // Ocean waves
];

const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
        title: '🏝️ Island Resort'
    },
    {
        src: 'https://images.unsplash.com/photo-1552632570-5b67b56dd298?w=600&q=80',
        title: '🌴 Tropical Beach'
    },
    {
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
        title: '🌊 Ocean Paradise'
    },
    {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
        title: '⛱️ Beach Heaven'
    },
    {
        src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
        title: '🌅 Sunset View'
    },
    {
        src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
        title: '✨ Luxury Resort'
    }
];

// Load Hero Background Image
function loadHeroBackground() {
    try {
        const randomHero = heroImages[Math.floor(Math.random() * heroImages.length)];
        const hero = document.querySelector('.hero');
        
        // Create a new image to check if it loads
        const img = new Image();
        img.onload = function() {
            hero.style.backgroundImage = `url('${randomHero}')`;
            hero.style.backgroundSize = 'cover';
            hero.style.backgroundPosition = 'center';
            hero.style.backgroundAttachment = 'fixed';
            console.log('✅ Hero background loaded successfully');
        };
        img.onerror = function() {
            console.log('⚠️ Image load failed, using gradient');
            hero.style.backgroundImage = 'linear-gradient(135deg, #0a547d 0%, #247ba0 50%, #00d4ff 100%)';
        };
        img.src = randomHero;
    } catch (error) {
        console.log('Hero error:', error);
        const hero = document.querySelector('.hero');
        hero.style.backgroundImage = 'linear-gradient(135deg, #0a547d 0%, #247ba0 50%, #00d4ff 100%)';
    }
}

// Load Gallery Images
function loadGalleryImages() {
    try {
        const galleryGrid = document.getElementById('gallery-grid');
        
        if (!galleryGrid) {
            console.log('Gallery grid not found');
            return;
        }
        
        galleryGrid.innerHTML = galleryImages.map((photo, index) => `
            <div class="gallery-item" style="animation-delay: ${index * 0.1}s; background-image: url('${photo.src}'); background-size: cover; background-position: center;">
                <img src="${photo.src}" alt="${photo.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; opacity: 0;">
                <div class="gallery-overlay">
                    <p>${photo.title}</p>
                </div>
            </div>
        `).join('');
        
        console.log('✅ Gallery images loaded successfully');
    } catch (error) {
        console.log('Gallery error:', error);
    }
}

// Load images on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏝️ Loading Philippine beach images...');
    loadHeroBackground();
    loadGalleryImages();
    
    // Retry after 1 second if hero still not loaded
    setTimeout(() => {
        const heroStyle = document.querySelector('.hero').style.backgroundImage;
        if (!heroStyle || heroStyle.includes('gradient')) {
            console.log('Retrying hero image...');
            loadHeroBackground();
        }
    }, 1500);
});

// Also load on window load for extra safety
window.addEventListener('load', () => {
    console.log('Window loaded, double-checking images...');
    loadHeroBackground();
    loadGalleryImages();
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Prevent body scroll when menu is open
    const observer = new MutationObserver(() => {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
}

// Booking Form Handler
function handleBooking(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const villaType = form.querySelector('select').value;
    
    showNotification(`✅ Booking Request Received!\n\nThank you, ${name}!\n\nA confirmation has been sent to ${email}\n\nVilla: ${villaType.toUpperCase()}\n\nOur team will contact you within 24 hours.\n\nMabuhay! 🇵🇭`);
    
    form.reset();
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff, #ffd60a);
        color: #0a2463;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 212, 255, 0.4);
        z-index: 2000;
        font-weight: 600;
        white-space: pre-line;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
        font-size: 0.95rem;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Villa Button Click Handlers
document.querySelectorAll('.villa-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const villaName = btn.parentElement.querySelector('h3').textContent;
        showNotification(`🏝️ ${villaName} Selected!\n\nScroll down to complete your booking in the Reserve Your Paradise section.`);
        document.querySelector('.booking-section').scrollIntoView({ behavior: 'smooth' });
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#00d4ff';
        }
    });
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Performance: Lazy load images with Intersection Observer
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-out';
});

console.log('%c🏝️ Welcome to Paraíso Island Resort', 'font-size: 20px; color: #00d4ff; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cExperience Paradise in the Philippines', 'font-size: 14px; color: #ffd60a;');
