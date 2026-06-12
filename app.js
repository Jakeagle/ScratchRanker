document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. IMAGE PIPELINE LOADER --- */
    const loadImages = () => {
        const imgData = window.__IMAGES__ || window.__IMAGES;
        if (!imgData) {
            console.warn("⚠️ window.__IMAGES__ is not defined. Falling back to dynamic placeholder rendering.");
            
            // Set dynamic visual backups so the site is never blank/broken during local testing
            const backups = {
                logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%237C3AED'/><circle cx='50' cy='50' r='20' fill='%23FFF'/><text x='50' y='58' text-anchor='middle' font-size='24' font-weight='900' fill='%237C3AED'>$</text></svg>",
                qrCode: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' fill='none'/><rect x='10' y='10' width='30' height='30' stroke='%23000' stroke-width='6' fill='none'/><rect x='60' y='10' width='30' height='30' stroke='%23000' stroke-width='6' fill='none'/><rect x='10' y='60' width='30' height='30' stroke='%23000' stroke-width='6' fill='none'/><rect x='20' y='20' width='10' height='10' fill='%23000'/><rect x='70' y='20' width='10' height='10' fill='%23000'/><rect x='20' y='70' width='10' height='10' fill='%23000'/><rect x='60' y='60' width='15' height='15' fill='%23000'/><rect x='80' y='80' width='10' height='10' fill='%23000'/></svg>",
                screenGames: "data:image/svg+xml;utf8,<svg viewBox='0 0 280 500' xmlns='http://www.w3.org/2000/svg'><rect width='280' height='500' fill='%2313131F'/><rect x='20' y='40' width='240' height='40' rx='10' fill='rgba(255,255,255,0.05)'/><rect x='20' y='100' width='240' height='100' rx='15' fill='%237C3AED'/></svg>",
                screenFilter: "data:image/svg+xml;utf8,<svg viewBox='0 0 280 500' xmlns='http://www.w3.org/2000/svg'><rect width='280' height='500' fill='%2313131F'/><circle cx='160' cy='183' r='12' fill='%23FFF'/></svg>",
                screenPrizes: "data:image/svg+xml;utf8,<svg viewBox='0 0 280 500' xmlns='http://www.w3.org/2000/svg'><rect width='280' height='500' fill='%2313131F'/><rect x='20' y='30' width='240' height='80' rx='15' fill='rgba(255,255,255,0.03)'/></svg>",
                screenPrizesSort: "data:image/svg+xml;utf8,<svg viewBox='0 0 280 500' xmlns='http://www.w3.org/2000/svg'><rect width='280' height='500' fill='%2313131F'/><rect x='20' y='30' width='240' height='40' rx='10' fill='rgba(255,255,255,0.05)'/><text x='140' y='55' text-anchor='middle' fill='%237C3AED' font-weight='bold'>SORTED BY ODDS</text></svg>"
            };
            
            applyImageSources(backups);
            return;
        }

        applyImageSources(imgData);
    };

    const applyImageSources = (sourceObject) => {
        // Safe mapping of logo images
        const logoImgs = document.querySelectorAll('.logo-img');
        logoImgs.forEach(img => {
            if (sourceObject.logo) img.src = sourceObject.logo;
        });

        // Correctly mapped QR code selector to match new HTML class (Fixes missing QR)
        const qrImg = document.querySelector('.qr-image-inline');
        if (qrImg && sourceObject.qrCode) qrImg.src = sourceObject.qrCode;

        // Safe mapping of Step Illustrations
        const step2Img = document.querySelector('.step-2-img');
        if (step2Img && sourceObject.screenGames) step2Img.src = sourceObject.screenGames;

        const step3Img = document.querySelector('.step-3-img');
        if (step3Img && sourceObject.screenFilter) step3Img.src = sourceObject.screenFilter;

        // Safe mapping of Features dual screenshots
        const featPrizesImg = document.querySelector('.feat-prizes-img');
        if (featPrizesImg && sourceObject.screenPrizes) featPrizesImg.src = sourceObject.screenPrizes;

        const featSortImg = document.querySelector('.feat-sort-img');
        if (featSortImg && sourceObject.screenPrizesSort) featSortImg.src = sourceObject.screenPrizesSort;
    };

    /* --- 2. UNIFIED LOTTERY TICKET AUTO-SCRATCH --- */
    const initTicketScratch = () => {
        const cells = document.querySelectorAll('.scratch-zone');
        
        cells.forEach((cell, index) => {
            const canvas = cell.querySelector('.zone-canvas');
            const content = cell.querySelector('.zone-reveal');
            if (!canvas || !content) return;

            const ctx = canvas.getContext('2d');
            
            // Size canvas to exactly match its parent zone
            const resize = () => {
                const rect = cell.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                
                // Draw Premium Gold Foil Gradient
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, '#BF953F');
                gradient.addColorStop(0.25, '#FCF6BA');
                gradient.addColorStop(0.5, '#B38728');
                gradient.addColorStop(0.75, '#FBF5B7');
                gradient.addColorStop(1, '#AA771C');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw Gold Border ridges
                ctx.strokeStyle = '#8A6F27';
                ctx.lineWidth = 4;
                ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

                // Draw Sparkling Dollar Sign in the middle
                ctx.font = '900 48px Inter';
                ctx.fillStyle = 'rgba(0,0,0,0.18)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('$', canvas.width/2, canvas.height/2);
            };

            resize();
            window.addEventListener('resize', resize);

            // Staggered Auto-Scratch sweeping coin animation
            let x = 0;
            let y = 30;
            let direction = 1;
            const brushSize = 50;

            const autoScratch = () => {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, brushSize, 0, Math.PI * 2);
                ctx.fill();

                x += 40 * direction;
                
                if (x > canvas.width + brushSize || x < -brushSize) { 
                    direction *= -1; 
                    y += 50; 
                }
                
                if (y < canvas.height + brushSize) {
                    requestAnimationFrame(autoScratch);
                } else {
                    canvas.style.opacity = '0';
                    content.classList.add('revealed');
                    setTimeout(() => canvas.remove(), 500);
                }
            };

            // Stagger: Tagline sweeps first, then the three features left-to-right
            setTimeout(() => requestAnimationFrame(autoScratch), 500 + (index * 800));
        });
    };

    /* --- 3. INTERACTIVE MANUAL SCRATCH --- */
    const initManualScratch = () => {
        const canvas = document.getElementById('manual-scratch-canvas');
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        const instruction = document.getElementById('scratch-instruction');
        let isDrawing = false;
        let scratchedPixels = 0;
        let isWon = false;

        // Draw Ticket Foil
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#e0e0e0');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#c0c0c0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '900 40px Inter';
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SCRATCH', canvas.width/2, canvas.height/2);

        const scratch = (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            
            if(instruction) instruction.style.opacity = '0';

            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (clientX - rect.left) * scaleX;
            const y = (clientY - rect.top) * scaleY;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.fill();

            scratchedPixels++;

            if (scratchedPixels > 40 && !isWon) {
                isWon = true;
                canvas.style.transition = 'opacity 0.6s ease';
                canvas.style.opacity = '0';
                fireConfetti();
                setTimeout(() => canvas.remove(), 600);
            }
        };

        canvas.addEventListener('mousedown', () => isDrawing = true);
        canvas.addEventListener('mousemove', scratch);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseleave', () => isDrawing = false);
        
        canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive: false});
        canvas.addEventListener('touchmove', scratch, {passive: false});
        canvas.addEventListener('touchend', () => isDrawing = false);
    };

    /* --- 4. FIRE CONFETTI --- */
    const fireConfetti = () => {
        const container = document.getElementById('confetti-container');
        if(!container) return;
        const colors = ['#7C3AED', '#4ADE80', '#FFB800', '#FFFFFF'];
        
        for (let i = 0; i < 80; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.top = '-150px';
            conf.style.animationDelay = Math.random() * 2 + 's';
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(conf);
        }
    };

    /* --- 5. DATA COUNTERS --- */
    const runCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const targetText = counter.getAttribute('data-target');
            
            let prefix = targetText.match(/^[^0-9]*/)[0] || '';
            let suffix = targetText.match(/[^0-9\.]*$/)[0] || '';
            let numStr = targetText.replace(/[^0-9\.]/g, '');
            let targetNum = parseFloat(numStr);
            let isFloat = targetText.includes('.');

            let frame = 0;
            const totalFrames = 60; // 1 second animation

            const update = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const easeOut = 1 - Math.pow(1 - progress, 3);
                let currentNum = targetNum * easeOut;

                if (isFloat) {
                    counter.innerText = prefix + currentNum.toFixed(1) + suffix;
                } else {
                    counter.innerText = prefix + Math.floor(currentNum).toLocaleString() + suffix;
                }

                if (frame === totalFrames) {
                    clearInterval(update);
                    counter.innerText = targetText; 
                }
            }, 1000 / 60);
        });
    };

    /* --- 6. PRICING TOGGLE --- */
    const initPricing = () => {
        const grid = document.getElementById('pricing-grid');
        const btnSingle = document.getElementById('btn-single');
        const btnMulti = document.getElementById('btn-multi');
        if(!grid) return;

        const data = {
            single: [
                { label: "Weekly", price: "$2.99", per: "/ week", trial: true },
                { label: "Monthly", price: "$4.99", per: "/ month", trial: true },
                { label: "Annual", price: "$25.99", per: "/ year", trial: true, pop: true }
            ],
            multi: [
                { label: "Weekly", price: "$4.99", per: "/ week" },
                { label: "Monthly", price: "$8.99", per: "/ month" },
                { label: "Annual", price: "$45.99", per: "/ year", pop: true }
            ]
        };

        const renderPricing = (type) => {
            grid.innerHTML = '';
            data[type].forEach((p, i) => {
                const delay = i * 0.15;
                grid.innerHTML += `
                    <div class="price-card ${p.pop ? 'popular' : ''} price-anim" style="animation-delay: ${delay}s">
                        ${p.pop ? '<div class="popular-badge">Best Value</div>' : ''}
                        <div class="price-label">${p.label}</div>
                        <div class="price-price-row">
                            <div class="price-val">${p.price}</div>
                            <div class="price-per">${p.per}</div>
                        </div>
                        ${p.trial ? '<div class="price-trial">✦ 3 days free trial</div>' : ''}
                    </div>
                `;
            });
        };

        btnSingle.addEventListener('click', () => {
            btnSingle.classList.add('active'); btnMulti.classList.remove('active');
            renderPricing('single');
        });

        btnMulti.addEventListener('click', () => {
            btnMulti.classList.add('active'); btnSingle.classList.remove('active');
            renderPricing('multi');
        });

        renderPricing('single'); // Init
    };

    /* --- 7. TESTIMONIAL SINGLE-SLIDE CAROUSEL --- */
    const initCarousel = () => {
        const track = document.querySelector('.testimonial-track');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const cards = document.querySelectorAll('.testimonial-card-wrapper');
        
        if (!track || cards.length === 0) return;

        let index = 0;
        let autoPlay = setInterval(() => moveNext(), 6000); // 6 seconds per slide

        const updatePosition = () => {
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

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(autoPlay);
                moveNext();
                autoPlay = setInterval(() => moveNext(), 10000); 
            });
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(autoPlay);
                movePrev();
                autoPlay = setInterval(() => moveNext(), 10000); 
            });
        }
    };

    /* --- 8. SCROLL CAROUSEL SYNC --- */
    const initScrollSync = () => {
        const container = document.querySelector('.scroll-container');
        const dots = document.querySelectorAll('.nav-dot');
        const slides = document.querySelectorAll('.slide');
        let countersRan = false;

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetId = dot.getAttribute('data-target');
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });

        container.addEventListener('scroll', () => {
            let current = '';
            slides.forEach(slide => {
                const slideTop = slide.offsetTop;
                if (container.scrollTop >= slideTop - (window.innerHeight / 2)) {
                    current = slide.getAttribute('id');
                }
            });

            dots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-target') === current) {
                    dot.classList.add('active');
                }
            });

            if (current === 'slide-details' && !countersRan) {
                runCounters();
                countersRan = true;
            }
        });
    };

    /* --- 9. INFINITE 2-SECOND RADAR FEATURE HIGHLIGHT --- */
    const initFeatureHighlightLoop = () => {
        const items = document.querySelectorAll('.feature-item');
        if (items.length === 0) return;
        
        let index = 0;
        
        setInterval(() => {
            items.forEach(item => item.classList.remove('active-highlight'));
            items[index].classList.add('active-highlight');
            index = (index + 1) % items.length;
        }, 2000);
    };

    /* --- 10. HIGH-END PARALLAX BACKGROUND DRIFT ENGINE (3D INTERACTION) --- */
    const initBgParallax = () => {
        const grid = document.querySelector('.bg-grid');
        const blobs = document.querySelectorAll('.ambient-blob');
        if (!grid && blobs.length === 0) return;

        window.addEventListener('mousemove', (e) => {
            // Calculate cursor offset percent relative to center of viewport
            const x = (e.clientX / window.innerWidth - 0.5) * 40; // Max 40px shift
            const y = (e.clientY / window.innerHeight - 0.5) * 40;

            // Tilt and translate background coordinate grid
            if (grid) {
                grid.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0) rotateX(${-y * 0.05}deg) rotateY(${x * 0.05}deg)`;
            }

            // Move the soft neon ambient blobs independently at varied depth speeds (asynchronous parallax)
            blobs.forEach((blob, idx) => {
                const depthSpeed = (idx + 1) * 0.35;
                blob.style.transform = `translate3d(${x * depthSpeed}px, ${y * depthSpeed}px, 0)`;
            });
        });
    };

    /* --- 11. DEPTH PARTICLE FIELD --- */
const initDepthParticles = () => {
    const count = 40;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'depth-particle';

        const size = Math.random() * 4 + 1;

        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.opacity = Math.random() * 0.4 + 0.1;

        document.body.appendChild(p);

        const duration = Math.random() * 40 + 30;

        p.animate(
            [
                { transform: 'translateY(0px)' },
                { transform: 'translateY(-200px)' }
            ],
            {
                duration: duration * 1000,
                iterations: Infinity
            }
        );
    }
};

    // --- INITIALIZE ALL ---
    loadImages();
    initTicketScratch();
    initManualScratch();
    initPricing();
    initCarousel();
    initScrollSync();
    initFeatureHighlightLoop();
    initBgParallax();
    initDepthParticles(); // Fire the 3D environmental depth engine

});
