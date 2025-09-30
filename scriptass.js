// --- THEME SWITCHER LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const applyTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
};

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

applyTheme();

// --- MAIN ANIMATIONS & INITIALIZATIONS ---
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Initialize Smooth Scrolling
    if (document.querySelector("#smooth-wrapper")) {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2,
            effects: true,
        });
    }

    // Animations for the Associations Page
    if (document.querySelector('.associations-header')) {
        // 1. GSAP Parallax for the Page Header Background
        gsap.to(".associations-header .page-header-bg", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".associations-header",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // 2. Header Title & Subtitle Entrance
        gsap.from(".animate-header-title", {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            delay: 0.3
        });
        gsap.from(".animate-header-subtitle", {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });

        // 3. Intro Paragraph Fade-in
        gsap.from(".animate-intro-text", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".intro-content",
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // 4. Staggered Animation for the Logo Wall
        gsap.from(".logo-card", {
            opacity: 0,
            y: 40,
            duration: 0.5,
            stagger: {
                each: 0.1,
                from: "start",
                grid: "auto"
            },
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".logo-wall-section",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // 5. Staggered Animation for Footer Columns
        gsap.from(".animate-footer-column", {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: "footer",
                start: "top 95%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // You can add other page-specific animations below using similar 'if' checks
    // if (document.querySelector('.about-page-identifier')) { ... }
    // if (document.querySelector('.contact-page-identifier')) { ... }

});