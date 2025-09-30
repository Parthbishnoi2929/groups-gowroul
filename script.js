// script.js
document.addEventListener("DOMContentLoaded", () => {

    // --- Swiper Slider Initialization ---
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        effect: 'fade', // Use 'slide', 'fade', 'cube', 'coverflow', or 'flip'
        
        // Autoplay
        autoplay: {
            delay: 4000, // Time in ms before next slide
            disableOnInteraction: false,
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    // --- GSAP Scroll Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // 1. Apple-like Pinned Section Animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#pinned-section-container",
            pin: true,    // Pin the trigger element while the timeline plays
            start: "top top", // When the top of the trigger hits the top of the viewport
            end: "+=2000", // Stay pinned for 2000px of scrolling
            scrub: 1,     // Smoothly scrub through the timeline as user scrolls
        }
    });

    // Add animations to the timeline
    tl.to(".pinned-text-0", { scale: 1, duration: 2 })
      .to(".pinned-text-0", { opacity: 0, duration: 1 }, "+=1") // Fade out initial text slightly before scaling ends
      .to(".pinned-text-1", { opacity: 1, duration: 1 })   // Fade in first text
      .to(".pinned-text-1", { opacity: 0, duration: 1 }, "+=1") // Fade out first text after a 1s pause
      .to(".pinned-text-2", { opacity: 1, duration: 1 })   // Fade in second text
      .to(".pinned-text-2", { opacity: 0, duration: 1 }, "+=1") // Fade out second text
      .to(".pinned-text-3", { opacity: 1, duration: 1 })   // Fade in third text
      .to(".pinned-text-3", { opacity: 0, duration: 1 }, "+=1"); // Fade it out


      
    // 2. Horizontal Scroll Animation
    const horizontalTrack = document.querySelector('.horizontal-track');
    if (horizontalTrack) { // Check if element exists before animating
        gsap.to(horizontalTrack, {
            x: () => -(horizontalTrack.scrollWidth - document.documentElement.clientWidth) + "px",
            ease: "none", // Linear movement
            scrollTrigger: {
                trigger: '.horizontal-scroll-container',
                pin: true,
                scrub: 1,
                end: () => "+=" + (horizontalTrack.scrollWidth - document.documentElement.clientWidth),
            }
        });
    }


    // --- Auto Rotating Image Carousel ---
    const carousel = document.getElementById('imageCarousel');
    if (carousel) {
        const images = carousel.querySelectorAll('.carousel-image');
        let currentIndex = 0;
        const animationClasses = ['fade-in', 'slide-left', 'zoom-out']; // Define different animation styles

        function showNextImage() {
            // Remove active class and all animation classes from current image
            images[currentIndex].classList.remove('active', ...animationClasses);
            
            currentIndex = (currentIndex + 1) % images.length;
            
            // Add active class and a random animation class to the next image
            const randomAnimClass = animationClasses[Math.floor(Math.random() * animationClasses.length)];
            images[currentIndex].classList.add('active', randomAnimClass);
        }

        // Start the rotation
        setInterval(showNextImage, 5000); // Change image every 5 seconds (5000ms)

        // Ensure the first image starts active with an animation
        if(images.length > 0) {
            images[0].classList.add('active', animationClasses[0]);
        }
    }


    // --- Basic Intersection Observer Scroll Animations ---
    const scrollElements = document.querySelectorAll(".animate-on-scroll");
    if (scrollElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        scrollElements.forEach((element) => {
            observer.observe(element);
        });
    }
 });
