// JavaScript code for the slider and other functionalities
// This script handles the slider functionality, including automatic transitions,
        // Slider functionality
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.slide-btn.prev');
            const nextBtn = document.querySelector('.slide-btn.next');
            const indicators = document.querySelectorAll('.indicator');
            const header = document.querySelector('header');
            let currentSlide = 0;
            let slideInterval;

            // Function to update slide position
            function updateSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                
                // Reset animations
                const animatedElements = slides[index].querySelectorAll('.animated');
                animatedElements.forEach(el => {
                    el.style.opacity = 0;
                    void el.offsetWidth; // Trigger reflow
                    el.style.opacity = '';
                });
                
                currentSlide = index;
            }

            // Event listeners for prev/next buttons
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
                updateSlide(currentSlide);
                startSlideInterval();
            });

            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
                updateSlide(currentSlide);
                startSlideInterval();
            });

            // Event listeners for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    updateSlide(index);
                    startSlideInterval();
                });
            });

            // Automatic slide transition
            function startSlideInterval() {
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
                    updateSlide(currentSlide);
                }, 6000); // Change slide every 6 seconds
            }

            // Start automatic slide transition
            startSlideInterval();

            // Sticky header with scroll effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });