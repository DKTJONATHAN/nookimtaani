// =====================
// Global Functions
// =====================

// Mobile menu toggle (works on all pages)
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    nav.classList.toggle("responsive");
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#mainNav a:not(.icon)').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById("mainNav");
            if (nav.classList.contains('responsive')) {
                nav.classList.remove('responsive');
            }
        });
    });
});

// =====================
// Homepage Features
// =====================
if (document.getElementById("testimonialSlider")) {
    // Testimonial slider data
    const testimonials = [
        {
            name: "Jane Muthoni",
            role: "Fashion Designer",
            content: "Nooki Mtaani helped me find affordable space for my pop-up shop in Westlands. Made 50K in my first weekend!",
            rating: 5
        },
        {
            name: "Mike Otieno",
            role: "Event Planner",
            content: "I regularly book halls through Nooki Mtaani for my events. The platform is easy to use and saves me time.",
            rating: 4
        },
        {
            name: "Sarah Kamau",
            role: "Space Owner",
            content: "I earn extra income by renting out my garage. The payments are secure and the team is very helpful.",
            rating: 5
        }
    ];

    // Display testimonials
    function displayTestimonials() {
        const slider = document.getElementById("testimonialSlider");
        let html = '';
        
        testimonials.forEach(testimonial => {
            let stars = '';
            for (let i = 0; i < testimonial.rating; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            html += `
                <div class="testimonial">
                    <div class="testimonial-content">"${testimonial.content}"</div>
                    <div class="testimonial-rating">${stars}</div>
                    <div class="testimonial-author">
                        <strong>${testimonial.name}</strong> - ${testimonial.role}
                    </div>
                </div>
            `;
        });
        
        slider.innerHTML = html;
    }

    // Initialize testimonial slider
    displayTestimonials();
    
    // Simple testimonial rotation
    let currentTestimonial = 0;
    setInterval(() => {
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach(t => t.style.display = 'none');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.display = 'block';
    }, 5000);
}

// =====================
// Find Spaces Page
// =====================
if (document.querySelector('.find-spaces-container')) {
    // Initialize map if map container exists
    if (document.getElementById('map')) {
        const map = L.map('map').setView([-1.286389, 36.817223], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add sample markers
        const spaces = [
            { lat: -1.3000, lng: 36.8000, title: "Garage in Kilimani", price: 1500 },
            { lat: -1.2700, lng: 36.8100, title: "Shop in Westlands", price: 2500 },
            { lat: -1.2900, lng: 36.8200, title: "Event Space in CBD", price: 5000 }
        ];

        spaces.forEach(space => {
            L.marker([space.lat, space.lng])
                .addTo(map)
                .bindPopup(`<b>${space.title}</b><br>KSh ${space.price}/day`);
        });
    }

    // Toggle between grid and map view
    document.querySelectorAll('.view-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.view-option').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'grid') {
                document.getElementById('spacesGrid').style.display = 'grid';
                document.getElementById('mapView').style.display = 'none';
            } else {
                document.getElementById('spacesGrid').style.display = 'none';
                document.getElementById('mapView').style.display = 'block';
                // Re-trigger map resize to ensure proper rendering
                setTimeout(() => map.invalidateSize(), 100);
            }
        });
    });

    // Load sample spaces
    const sampleSpaces = [
        {
            id: 1,
            title: "Secure Garage in Kilimani",
            type: "garage",
            price: 1500,
            location: "Kilimani, Nairobi",
            image: "images/garage1.jpg",
            amenities: ["Parking", "24/7 Access"]
        },
        {
            id: 2,
            title: "Prime Retail Shop",
            type: "shop",
            price: 3500,
            location: "Westlands, Nairobi",
            image: "images/shop1.jpg",
            amenities: ["High Traffic", "Security"]
        },
        {
            id: 3,
            title: "Spacious Event Hall",
            type: "event space",
            price: 8000,
            location: "Nairobi CBD",
            image: "images/hall1.jpg",
            amenities: ["Sound System", "Chairs", "Catering Space"]
        }
    ];

    const spacesGrid = document.getElementById('spacesGrid');
    if (spacesGrid) {
        sampleSpaces.forEach(space => {
            spacesGrid.innerHTML += `
                <div class="space-card">
                    <div class="space-image" style="background-image: url('${space.image}')">
                        <span class="space-price">KSh ${space.price}/day</span>
                        <span class="space-type">${space.type}</span>
                    </div>
                    <div class="space-details">
                        <h3>${space.title}</h3>
                        <p class="space-location"><i class="fas fa-map-marker-alt"></i> ${space.location}</p>
                        <div class="space-amenities">
                            ${space.amenities.map(a => `<span><i class="fas fa-check"></i> ${a}</span>`).join('')}
                        </div>
                        <a href="space-details.html?id=${space.id}" class="cta-button small">View Details</a>
                    </div>
                </div>
            `;
        });
    }

    // Search functionality
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const locationTerm = document.getElementById('locationInput').value.toLowerCase();
            
            document.querySelectorAll('.space-card').forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const location = card.querySelector('.space-location').textContent.toLowerCase();
                const matchesSearch = title.includes(searchTerm) || searchTerm === '';
                const matchesLocation = location.includes(locationTerm) || locationTerm === '';
                
                card.style.display = (matchesSearch && matchesLocation) ? 'block' : 'none';
            });
        });
    }
}

// =====================
// Smooth Scrolling
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});