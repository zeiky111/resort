// Pixabay API for Philippine Beach Images (No CORS Issues)
const PIXABAY_API_KEY = '43437748-1b4e5c8c5f5e2a0b5c8e1d2f';

// Load Hero Background Image
async function loadHeroBackground() {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=philippines%20beach%20resort%20tropical&image_type=photo&per_page=1&order=popular`);
        
        if (response.ok) {
            const data = await response.json();
            if (data.hits && data.hits.length > 0) {
                const photoUrl = data.hits[0].largeImageURL;
                const hero = document.querySelector('.hero');
                hero.style.backgroundImage = `url('${photoUrl}')`;
                console.log('Hero background loaded successfully');
                return;
            }
        }
    } catch (error) {
        console.log('Hero image load error:', error);
    }
    
    // Fallback gradient
    const hero = document.querySelector('.hero');
    hero.style.backgroundImage = 'linear-gradient(135deg, #0a547d 0%, #247ba0 50%, #00d4ff 100%)';
}

// Load Gallery Images from Pixabay API
async function loadGalleryImages() {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=philippines%20beach%20tropical&image_type=photo&per_page=12&order=popular`);
        
        if (response.ok) {
            const data = await response.json();
            const galleryGrid = document.getElementById('gallery-grid');
            
            if (data.hits && data.hits.length > 0) {
                galleryGrid.innerHTML = data.hits.slice(0, 6).map((photo, index) => `
                    <div class="gallery-item" style="animation-delay: ${index * 0.1}s;">
                        <img src="${photo.webformatURL}" alt="Philippine Beach" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                        <div class="gallery-overlay">
                            <p>🏝️ Island Paradise</p>
                        </div>
                    </div>
                `).join('');
                console.log('Gallery images loaded successfully');
                return;
            }
        }
    } catch (error) {
        console.log('Gallery load error, using fallback:', error);
    }
    
    // Fallback: Create gradient cards
    const fallbackImages = [
        { title: 'Crystal Clear Waters', color: '#00d4ff' },
        { title: 'Sunset Paradise', color: '#ff6b6b' },
        { title: 'White Sand Beaches', color: '#ffd60a' },
        { title: 'Tropical Flora', color: '#6bcf7f' },
        { title: 'Island Serenity', color: '#9b59b6' },
        { title: 'Ocean Horizon', color: '#00b4d8' }
    ];
    
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = fallbackImages.map((item, index) => `
        <div class="gallery-item" style="animation-delay: ${index * 0.1}s; background: linear-gradient(135deg, ${item.color} 0%, ${shiftColor(item.color)} 100%);">
            <div class="gallery-overlay">
                <p>${item.title}</p>
            </div>
        </div>
    `).join('');
}

// Helper function to shift color
function shiftColor(hex) {
    const num = parseInt(hex.slice(1), 16);
    const amt = 50;
    const usePound = true;
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return (usePound ? "#" : "") + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
        (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255))
        .toString(16).slice(1);
}

// Load images on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Loading Philippine beach images...');
    loadHeroBackground();
    loadGalleryImages();
    setTimeout(() => {
        if (!document.querySelector('.hero').style.backgroundImage) {
            loadHeroBackground();
        }
    }, 1000);
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
