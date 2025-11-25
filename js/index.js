// Loader
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 2000);
        });

        // Floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
            particle.style.animationDuration = Math.random() * 3 + 3 + 's';
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 6000);
        }

        setInterval(createParticle, 300);

        // Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.2)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        let autoSlideInterval;

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            const track = document.getElementById('carouselTrack');
            track.style.transform = `translateX(-${slideIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        }

        // Add navigation buttons
        const carouselContainer = document.querySelector('.carousel-container');
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-nav prev';
        prevButton.innerHTML = '❮';
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-nav next';
        nextButton.innerHTML = '❯';
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);

        // Add event listeners for manual navigation
        prevButton.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            prevSlide();
            startAutoSlide();
        });

        nextButton.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            nextSlide();
            startAutoSlide();
        });

        // Auto-advance carousel
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        startAutoSlide();

        // Animate elements on scroll
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

        // Observe all cards and sections
        document.querySelectorAll('.stat-card, .project-card, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Stats counter animation
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = stat.textContent;
                const isNumber = !isNaN(target.replace('+', ''));
                
                if (isNumber) {
                    const finalNumber = parseInt(target.replace('+', ''));
                    let current = 0;
                    const increment = finalNumber / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            current = finalNumber;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                    }, 50);
                }
            });
        }

        // Trigger stats animation when stats section is visible
        const statsSection = document.getElementById('stats');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statsObserver.observe(statsSection);

// Add showCustomAlert function
function showCustomAlert(type, title, message) {
    console.log('showCustomAlert called with:', type, title, message);
    // Remove existing alert if any
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert container
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;

    // Create alert title
    const alertTitle = document.createElement('div');
    alertTitle.className = 'alert-title';
    alertTitle.innerHTML = title;

    // Create alert message
    const alertMessage = document.createElement('div');
    alertMessage.className = 'alert-message';
    alertMessage.innerHTML = message;

    // Append title and message to alert
    alert.appendChild(alertTitle);
    alert.appendChild(alertMessage);

    // Append alert to body
    document.body.appendChild(alert);
    console.log('Alert element appended to body:', alert);

    // Show alert with animation
    setTimeout(() => {
        alert.classList.add('show');
    }, 100);

    // Hide alert after 4 seconds
    setTimeout(() => {
        alert.classList.remove('show');
        // Remove alert from DOM after animation
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 4000);
}

        // Add 3D tilt effect to cards
        document.querySelectorAll('.project-card, .stat-card, .testimonial-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        }

        // Initialize typing effect after loader
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero p');
            typeWriter(heroTitle, 'Himesh Raghuwanshi', 150);
            setTimeout(() => {
                typeWriter(heroSubtitle, 'Computer Engineer | Ai & DS expert | Full Stack Developer', 100);
            }, 2500);
        }, 3000);

        // Add parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-content');
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add glitch effect to logo on hover
        const logo = document.querySelector('.logo');
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });

        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });

        // Add CSS for glitch effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(style);

        // Add scroll-triggered animations
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.section-title');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }
            });
        };

        // Initialize scroll animations
        document.querySelectorAll('.section-title').forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(50px) scale(0.8)';
            title.style.transition = 'all 0.6s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on load

        // Add mouse trail effect
        let mouseTrail = [];
        document.addEventListener('mousemove', function(e) {
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });
            
            if (mouseTrail.length > 10) {
                mouseTrail.shift();
            }
            
            updateMouseTrail();
        });

        function updateMouseTrail() {
            const existingTrails = document.querySelectorAll('.mouse-trail');
            existingTrails.forEach(trail => trail.remove());
            
            mouseTrail.forEach((point, index) => {
                const trail = document.createElement('div');
                trail.className = 'mouse-trail';
                trail.style.cssText = `
                    position: fixed;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    width: ${10 - index}px;
                    height: ${10 - index}px;
                    background: rgba(0, 255, 136, ${0.8 - index * 0.08});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    transition: all 0.1s ease;
                `;
                document.body.appendChild(trail);
                
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.remove();
                    }
                }, 500);
            });
        }

        // Add data visualization effect to stats
        function createDataVisualization() {
            const statsCards = document.querySelectorAll('.stat-card');
            statsCards.forEach((card, index) => {
                const canvas = document.createElement('canvas');
                canvas.width = 200;
                canvas.height = 100;
                canvas.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.1;
                    pointer-events: none;
                `;
                card.appendChild(canvas);
                
                const ctx = canvas.getContext('2d');
                animateGraph(ctx, canvas.width, canvas.height, index);
            });
        }

        function animateGraph(ctx, width, height, index) {
            const points = [];
            for (let i = 0; i < 20; i++) {
                points.push({
                    x: (i / 19) * width,
                    y: height/2 + Math.sin(i * 0.5 + index) * 20
                });
            }
            
            let frame = 0;
            function draw() {
                ctx.clearRect(0, 0, width, height);
                ctx.strokeStyle = '#00ff88';
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                points.forEach((point, i) => {
                    const y = height/2 + Math.sin(i * 0.5 + index + frame * 0.1) * 20;
                    if (i === 0) {
                        ctx.moveTo(point.x, y);
                    } else {
                        ctx.lineTo(point.x, y);
                    }
                });
                
                ctx.stroke();
                frame++;
                requestAnimationFrame(draw);
            }
            draw();
        }

        // Initialize data visualization
        setTimeout(createDataVisualization, 4000);

       function playNewSound() {
    // Check for browser compatibility
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (!audioContext) {
        console.warn("AudioContext not supported in this browser.");
        return;
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // 1. Setup the basic connection
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 2. Sound characteristics (A slightly higher, clearer tone)
    const startFrequency = 1200; // Start at 1200 Hz
    const duration = 0.1; // Still short

    oscillator.type = 'triangle'; // Changed to 'triangle' for a slightly warmer, less harsh sound
    oscillator.frequency.setValueAtTime(startFrequency, audioContext.currentTime);

    // 3. Volume envelope (Fades in and out quickly for a "pop" effect)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start at 0 volume
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01); // Quick attack (volume up)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration); // Quick decay (volume down)

    // 4. Subtle Pitch Change (makes it sound more like a "ding")
    const peakFrequency = 1350;
    oscillator.frequency.exponentialRampToValueAtTime(peakFrequency, audioContext.currentTime + duration * 0.5); // Increase pitch rapidly
    oscillator.frequency.exponentialRampToValueAtTime(startFrequency, audioContext.currentTime + duration); // Decrease pitch rapidly

    // 5. Start and stop
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Attach the new sound to the elements
document.querySelectorAll('button, .nav-links a').forEach(element => {
    element.addEventListener('click', () => {
        playNewSound(); // Use the new function
    });
});
       

        // Contact Form Handling
        function handleContactSubmit(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Create message object
            const newMessage = {
                name: name,
                email: email,
                message: message
            };
            
            // Send to backend
            fetch('http://localhost:3000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showCustomAlert('error', 'Error', 'Failed to send message: ' + data.error);
                } else {
                    showCustomAlert('success', 'Message Sent!', 'Thank you for contacting me. I will get back to you soon.');
                    document.getElementById('contactForm').reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                showCustomAlert('error', 'Error', 'Failed to connect to server.');
            });
        }

        console.log('🚀 Himesh Raghuwanshi Portfolio Loaded Successfully!');
        console.log('🎯 AI & ML Engineer | Full Stack Developer');
        console.log('📧 Ready to collaborate on innovative projects!');

        function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
}