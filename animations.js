const initScratchRankerFX = () => {
    const root = document.getElementById('root');

    const initCarousel = () => {
        const track = document.querySelector('.testimonial-track');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const cards = document.querySelectorAll('.testimonial-card-wrapper');
        
        if (!track || cards.length === 0) return;

        let index = 0;
        let autoPlay = setInterval(() => moveNext(), 5000); // Change every 5 seconds

        const updatePosition = () => {
            // Move by 100% for each index
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        const moveNext = () => {
            index = (index + 1) >= cards.length ? 0 : index + 1;
            updatePosition();
        };

        const movePrev = () => {
            index = (index - 1) < 0 ? cards.length - 1 : index - 1;
            updatePosition();
        };

        nextBtn.addEventListener('click', () => {
            clearInterval(autoPlay);
            moveNext();
            autoPlay = setInterval(() => moveNext(), 8000); // Resume slower autoplay
        });

        prevBtn.addEventListener('click', () => {
            clearInterval(autoPlay);
            movePrev();
            autoPlay = setInterval(() => moveNext(), 8000);
        });
    };

    /* 
       Add 'initCarousel()' inside your mainObserver at the bottom
    */

    // 1. Tags sections for backgrounds and reveals
    const prepareElements = () => {
        const containers = document.querySelectorAll('section, nav, footer');
        containers.forEach((el) => {
            el.classList.add('sr-section');
            const items = el.querySelectorAll('h1, h2, h3, p, button, a, img, li');
            items.forEach((item, index) => {
                item.classList.add('sr-item');
                item.style.transitionDelay = `${index * 0.05}s`;
                if (item.src && item.src.includes('screenGames')) {
                    item.classList.add('hero-phone');
                }
            });
        });
        startObserving(containers);
    };

    // 2. Specific Hero Video injection
    const injectHeroVideo = () => {
        const sections = document.querySelectorAll('section');
        let hero = null;
        sections.forEach(s => {
            if (s.textContent.includes("Stop guessing")) hero = s;
        });

        if (!hero) return;

        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-bg-container';
        videoWrapper.innerHTML = `
            <div class="video-overlay"></div>
            <video autoplay muted loop playsinline>
                <source src="celebration.mp4" type="video/mp4">
            </video>`;
        hero.prepend(videoWrapper);
    };

    // 3. Smooth Scroll Navigation
    const setupSmoothScroll = () => {
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 20,
                        behavior: "smooth"
                    });
                }
            });
        });
    };

    // 4. Pricing Toggle Logic
const observePricingSwitch = () => {
        const obs = new MutationObserver(() => {
            const grid = document.querySelector('.pricing-grid-container');
            if (grid) {
                // Find all pricing cards (the buttons)
                const cards = grid.querySelectorAll('button');
                cards.forEach((card) => {
                    // Tag them with our Slot Machine class
                    card.classList.add('pricing-card-animate');
                    
                    // We must also keep the 'hover-card' logic active
                    card.classList.add('hover-card');
                });
            }
        });
        
        // This watches specifically for when the cards swap in the React root
        obs.observe(root, { childList: true, subtree: true });
    };

    const applyAlternatingBackgrounds = () => {
        document.querySelectorAll('section').forEach((sec, idx) => {
            sec.classList.add(idx % 2 === 0 ? 'section-light' : 'section-dark');
        });
    };

    const startObserving = (containers) => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        containers.forEach(c => obs.observe(c));
    };

    // Launch everything when React content appears
    const mainObserver = new MutationObserver((mutations, obs) => {
        if (root.children.length > 0) {
            prepareElements();
            injectHeroVideo();
            applyAlternatingBackgrounds();
            setupSmoothScroll();
            observePricingSwitch();
             initCarousel(); // <--- ACTIVATE CAROUSEL
            
            document.querySelectorAll('div').forEach(div => {
                const bg = div.style.background;
                if (bg && bg.includes('radial-gradient') && bg.includes('124, 58, 237')) {
                    div.classList.add('glow-pulse-layer');
                }
            });
            obs.disconnect();
        }
    });

    mainObserver.observe(root, { childList: true });
};

initScratchRankerFX();