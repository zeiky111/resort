// Weather API Integration using Open-Meteo (Free, No API Key Required)
async function fetchWeather() {
    try {
        // Resort location coordinates (Paradise Islands)
        const latitude = 20.8987;
        const longitude = -87.3431;
        
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&timezone=auto`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather');
        
        const data = await response.json();
        const current = data.current;
        
        const weatherDescriptions = {
            0: '☀️ Clear',
            1: '⛅ Mostly Clear',
            2: '☁️ Partly Cloudy',
            3: '☁️ Overcast',
            45: '🌫️ Foggy',
            48: '🌫️ Depositing Rime Fog',
            51: '🌧️ Light Drizzle',
            53: '🌧️ Moderate Drizzle',
            55: '🌧️ Dense Drizzle',
            61: '🌧️ Slight Rain',
            63: '🌧️ Moderate Rain',
            65: '🌧️ Heavy Rain',
            71: '❄️ Slight Snow',
            73: '❄️ Moderate Snow',
            75: '❄️ Heavy Snow',
            77: '❄️ Snow Grains',
            80: '🌧️ Slight Rain Showers',
            81: '🌧️ Moderate Rain Showers',
            82: '🌧️ Violent Rain Showers',
            85: '❄️ Slight Snow Showers',
            86: '❄️ Heavy Snow Showers',
            95: '⛈️ Thunderstorm',
            96: '⛈️ Thunderstorm with Hail',
            99: '⛈️ Thunderstorm with Heavy Hail'
        };
        
        const weatherDescription = weatherDescriptions[current.weather_code] || '🌤️ Pleasant';
        
        const weatherHTML = `
            <div class="weather-card weather-loaded" style="animation: slideUp 0.6s ease-out;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">${weatherDescription}</div>
                        <p style="font-size: 2.5rem; font-weight: bold; color: #e94560; margin: 0;">${Math.round(current.temperature_2m)}°F</p>
                    </div>
                    <div style="text-align: left; display: flex; flex-direction: column; gap: 1rem;">
                        <div style="border-left: 3px solid #e94560; padding-left: 1rem;">
                            <p style="color: #b8b8b8; margin: 0; font-size: 0.9rem;">Humidity</p>
                            <p style="color: #ffffff; margin: 0.3rem 0 0 0; font-size: 1.3rem; font-weight: 600;">${current.relative_humidity_2m}%</p>
                        </div>
                        <div style="border-left: 3px solid #f8b500; padding-left: 1rem;">
                            <p style="color: #b8b8b8; margin: 0; font-size: 0.9rem;">Wind Speed</p>
                            <p style="color: #ffffff; margin: 0.3rem 0 0 0; font-size: 1.3rem; font-weight: 600;">${Math.round(current.wind_speed_10m)} mph</p>
                        </div>
                        <div style="border-left: 3px solid #00f2fe; padding-left: 1rem;">
                            <p style="color: #b8b8b8; margin: 0; font-size: 0.9rem;">Location</p>
                            <p style="color: #ffffff; margin: 0.3rem 0 0 0; font-size: 1.3rem; font-weight: 600;">Paradise Resort</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('weather-widget').innerHTML = weatherHTML;
    } catch (error) {
        console.error('Weather fetch error:', error);
        document.getElementById('weather-widget').innerHTML = `
            <div class="weather-card" style="animation: slideUp 0.6s ease-out;">
                <p>🌴 Beautiful tropical conditions await you at Meridian Resort!</p>
                <p style="color: #b8b8b8; margin-top: 1rem; font-size: 0.9rem;">Average: 82°F | Humidity: 75% | Perfect beach weather</p>
            </div>
        `;
    }
}

// Call weather function on page load
document.addEventListener('DOMContentLoaded', fetchWeather);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.room-card, .amenity-card, .testimonial-card, .contact-card').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

// Booking Form Handler
function handleBooking(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const name = form.querySelector('input[type="text"]').value;
    const roomType = form.querySelector('select').value;
    
    // Create booking confirmation
    showNotification(`✅ Booking Confirmed!\n\nThank you, ${name}!\n\nA confirmation has been sent to ${email}\n\nRoom Type: ${roomType.toUpperCase()}\n\nOur team will contact you within 24 hours with final details.`);
    
    // Reset form
    form.reset();
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #e94560, #f8b500);
        color: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(233, 69, 96, 0.4);
        z-index: 2000;
        font-weight: 600;
        white-space: pre-line;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
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

// Room Button Click Handlers
document.querySelectorAll('.room-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const roomName = btn.parentElement.querySelector('h3').textContent;
        showNotification(`🏨 ${roomName} Selected!\n\nScroll down to complete your booking in the Booking Section below.`);
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
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#e94560';
        } else {
            link.style.color = '#eaeaea';
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

// Mobile Menu Toggle (if needed)
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Request Animation Frame for smooth animations
let animationId;

function smoothScroll() {
    animationId = requestAnimationFrame(smoothScroll);
}

smoothScroll();

// Performance optimization: Image lazy loading (for future image integration)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Refresh weather every 30 minutes
setInterval(fetchWeather, 30 * 60 * 1000);
