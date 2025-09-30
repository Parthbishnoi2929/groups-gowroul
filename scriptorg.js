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

    // --- START: ADD THESE ANIMATIONS FOR THE ORIGINATOR PAGE ---
    if (document.querySelector('.originator-header')) {
        // 1. GSAP Parallax for the Page Header
        gsap.to(".originator-header .page-header-bg", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".originator-header",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // 2. Advanced Animation for Founder Blocks
        document.querySelectorAll('.founder-block').forEach(block => {
            const image = block.querySelector('.founder-image');
            const bio = block.querySelector('.founder-bio');
            const isReversed = block.classList.contains('founder-reverse');

            gsap.set(image, { autoAlpha: 0, x: isReversed ? 100 : -100, scale: 0.9 });
            gsap.set(bio, { autoAlpha: 0, x: isReversed ? -100 : 100 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: block,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(image, { autoAlpha: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" })
              .to(bio, { autoAlpha: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.8");
        });
    }
    // --- END: ORIGINATOR PAGE ANIMATIONS ---

});