# 🏨 MERIDIAN - Luxury Resort Website

A premium, high-end static website for a luxury resort with advanced animations, transitions, and real API integration.

## ✨ Features

### 🎨 **Modern Design Elements**
- Elegant gradient color scheme with premium typography
- Playfair Display serif font for luxurious headings
- Smooth transitions and advanced CSS animations
- Fully responsive design (mobile, tablet, desktop)

### 🎬 **Advanced Animations**
- Hero section with floating gradient spheres
- Smooth scroll animations on all sections
- Card hover effects with depth transformations
- Staggered animations for multiple elements
- Parallax scrolling background
- Loading spinners and smooth state transitions
- CTA button hover animations with glass morphism

### 🌐 **API Integration**
- **Real-time Weather Data**: Integrated with Open-Meteo Weather API (free, no authentication required)
- Live temperature, humidity, wind speed, and weather conditions
- Auto-refresh every 30 minutes
- Beautiful weather widget with dynamic styling

### 📱 **Responsive Design**
- Mobile-first approach
- Breakpoints for tablets and mobile devices
- Touch-friendly interactive elements
- Optimized for all screen sizes

### ⚡ **Interactive Features**
- Smooth scroll navigation
- Booking form with validation
- Room selection system
- Notification system for user actions
- Intersection Observer for scroll animations
- Dynamic link highlighting based on scroll position

## 📁 **File Structure**

```
resort/
├── index.html      # Main HTML file with semantic structure
├── style.css       # Complete styling with animations
├── script.js       # JavaScript for interactivity and APIs
└── README.md       # Documentation
```

## 🚀 **How to Use**

1. **Open in Browser**: Simply open `index.html` in any modern web browser
2. **No Build Process**: This is a static website - no compilation needed
3. **No Server Required**: Works completely client-side
4. **Live Features**: Weather data loads automatically from the free Open-Meteo API

## 🎯 **Key Sections**

### 1. **Navigation Bar**
- Fixed navigation with smooth animations
- Active link highlighting
- Gradient logo with hover effects

### 2. **Hero Section**
- Large, impressive headline
- Animated background with gradient shifts
- Floating animation spheres
- Call-to-action button with glass morphism

### 3. **Weather Widget**
- Real-time weather data from Open-Meteo API
- Shows temperature, humidity, and wind speed
- Auto-updates every 30 minutes
- Beautiful card layout with icons

### 4. **Rooms Showcase**
- 6 different room types
- Beautiful gradient backgrounds
- Hover effects with zoom and lift animations
- Price display and booking buttons
- Staggered entrance animations

### 5. **Amenities**
- 8 world-class amenities
- Icon-based display
- Smooth hover transformations
- Glassmorphism cards

### 6. **Testimonials**
- Guest reviews with 5-star ratings
- Scale animations on hover
- Responsive grid layout

### 7. **Booking Form**
- Professional contact form
- Input validation
- Beautiful glassmorphism styling
- Submission confirmation notification

### 8. **Contact Information**
- Location, phone, and hours
- Contact cards with hover effects
- Clean layout

## 🎨 **Color Palette**

- **Primary**: `#1a1a2e` (Dark Navy)
- **Secondary**: `#16213e` (Darker Blue)
- **Accent**: `#0f3460` (Deep Blue)
- **Highlight**: `#e94560` (Vibrant Red)
- **Gold**: `#f8b500` (Luxury Gold)
- **Text**: `#eaeaea` (Light Gray)

## 🔧 **Technologies Used**

- **HTML5**: Semantic structure
- **CSS3**: Advanced animations, gradients, transitions
- **JavaScript (ES6)**: 
  - Fetch API for weather data
  - Intersection Observer for scroll animations
  - Event listeners for interactivity
- **Open-Meteo API**: Free weather data service (no API key required)

## 📱 **Browser Support**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 **Customization**

### Change Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #1a1a2e;
    --secondary-color: #16213e;
    --highlight-color: #e94560;
    /* ... etc */
}
```

### Update Resort Information
- Edit room names, prices, and descriptions in `index.html`
- Update contact information in the contact section
- Modify amenities and features

### Change Weather Location
In `script.js`, update the coordinates:
```javascript
const latitude = 20.8987;   // Your latitude
const longitude = -87.3431; // Your longitude
```

## 🌟 **Professional Features**

✅ Glass morphism effects on cards
✅ GPU-accelerated animations
✅ Smooth cubic-bezier transitions
✅ Parallax scrolling effects
✅ Real API integration
✅ Professional notification system
✅ Optimized performance
✅ Clean, maintainable code
✅ Accessibility considerations
✅ Mobile-first responsive design

## 📊 **Performance**

- Lightweight: No external dependencies
- Fast loading: Pure CSS and vanilla JavaScript
- Smooth 60fps animations
- Efficient API calls with 30-minute refresh interval

## 🎓 **Code Quality**

- Clean, readable JavaScript
- Organized CSS with logical sections
- Semantic HTML structure
- Comments for clarity
- Modern ES6+ JavaScript practices

## 🔐 **Security**

- Client-side only (no backend vulnerabilities)
- Weather API is read-only
- Form data handled locally
- No external script dependencies

---

**Created with ❤️ for the ultimate luxury resort experience**

*Last Updated: February 2026*
