// ============================================
// Ampleton Website - Main JavaScript
// Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle with Shutter Animation
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            const isActive = navMenu.classList.contains('active');

            if (isActive) {
                // Close menu with shutter animation
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            } else {
                // Open menu with shutter animation
                navMenu.classList.add('active');
                mobileMenuToggle.classList.add('active');
            }
        });

        // Handle dropdown toggle in mobile menu
        const dropdownItems = navMenu.querySelectorAll('.nav-item.dropdown');
        dropdownItems.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });
            }
        });

        // Close menu when clicking on a regular nav link (not dropdown toggle)
        const mobileNavLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                // Close all dropdowns
                dropdownItems.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active Navigation Link on Scroll - REMOVED per user request to keep static page-based active stats
    // const sections = document.querySelectorAll('section[id]');
    // const navLinksArray = document.querySelectorAll('.nav-link');

    // function updateActiveNavLink() {
    //     const scrollPosition = window.scrollY + 150;

    //     sections.forEach(section => {
    //         const sectionTop = section.offsetTop;
    //         const sectionHeight = section.offsetHeight;
    //         const sectionId = section.getAttribute('id');

    //         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
    //             navLinksArray.forEach(link => {
    //                 link.classList.remove('active');
    //                 if (link.getAttribute('href') === `#${sectionId}`) {
    //                     link.classList.add('active');
    //                 }
    //             });
    //         }
    //     });
    // }

    // window.addEventListener('scroll', updateActiveNavLink);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = question.querySelector('.faq-icon');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqIcon = faqItem.querySelector('.faq-icon');
                faqIcon.textContent = '+';
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                icon.textContent = '−';
            }
        });
    });

    // Portfolio Carousel
    const portfolioCards = document.querySelector('.portfolio-cards');
    const portfolioPrevBtn = document.querySelector('.portfolio-carousel .portfolio-carousel-prev') || document.querySelector('.portfolio-carousel .carousel-btn-prev');
    const portfolioNextBtn = document.querySelector('.portfolio-carousel .portfolio-carousel-next') || document.querySelector('.portfolio-carousel .carousel-btn-next');

    if (portfolioCards && portfolioPrevBtn && portfolioNextBtn) {
        portfolioNextBtn.addEventListener('click', function () {
            const card = portfolioCards.querySelector('.portfolio-card');
            if (card) {
                // Calculate scroll amount dynamically
                const scrollAmount = card.offsetWidth + 32;
                portfolioCards.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });

        portfolioPrevBtn.addEventListener('click', function () {
            const card = portfolioCards.querySelector('.portfolio-card');
            if (card) {
                const scrollAmount = card.offsetWidth + 32;
                portfolioCards.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Blogs Carousel
    const blogsCards = document.querySelector('.blogs-cards');
    const blogsPrevBtn = document.querySelector('.blogs-carousel .blogs-carousel-prev') || document.querySelector('.blogs-carousel .carousel-btn-prev');
    const blogsNextBtn = document.querySelector('.blogs-carousel .blogs-carousel-next') || document.querySelector('.blogs-carousel .carousel-btn-next');

    if (blogsCards && blogsPrevBtn && blogsNextBtn) {
        blogsNextBtn.addEventListener('click', function () {
            const card = blogsCards.querySelector('.blog-card');
            if (card) {
                // Calculate scroll amount dynamically (card width + gap)
                // Using 32px as approximation for var(--spacing-xl) which is 2rem
                const scrollAmount = card.offsetWidth + 32;
                blogsCards.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });

        blogsPrevBtn.addEventListener('click', function () {
            const card = blogsCards.querySelector('.blog-card');
            if (card) {
                const scrollAmount = card.offsetWidth + 32;
                blogsCards.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Testimonials Carousel
    const testimonialsCards = document.querySelector('.testimonials-cards');
    const testimonialsPrevBtn = document.querySelector('.testimonials-carousel .testimonials-carousel-prev') || document.querySelector('.testimonials-carousel .carousel-btn-prev');
    const testimonialsNextBtn = document.querySelector('.testimonials-carousel .testimonials-carousel-next') || document.querySelector('.testimonials-carousel .carousel-btn-next');

    if (testimonialsCards && testimonialsPrevBtn && testimonialsNextBtn) {
        let testimonialsScrollPosition = 0;
        const testimonialCardWidth = testimonialsCards.querySelector('.testimonial-card').offsetWidth;
        const testimonialGap = 32;
        const testimonialScrollAmount = testimonialCardWidth + testimonialGap;

        testimonialsNextBtn.addEventListener('click', function () {
            testimonialsScrollPosition += testimonialScrollAmount;
            const maxScroll = testimonialsCards.scrollWidth - testimonialsCards.offsetWidth;
            if (testimonialsScrollPosition > maxScroll) {
                testimonialsScrollPosition = maxScroll;
            }
            testimonialsCards.scrollTo({
                left: testimonialsScrollPosition,
                behavior: 'smooth'
            });
        });

        testimonialsPrevBtn.addEventListener('click', function () {
            testimonialsScrollPosition -= testimonialScrollAmount;
            if (testimonialsScrollPosition < 0) {
                testimonialsScrollPosition = 0;
            }
            testimonialsCards.scrollTo({
                left: testimonialsScrollPosition,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');

    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();

            if (email && email.includes('@')) {
                // Here you would typically send the email to your backend
                alert('Thank you for subscribing! We will keep you updated with the latest energy insights.');
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // // Header Scroll Effect - Keep header transparent, only adjust header-bar if needed
    // const headerBar = document.querySelector('.header-bar');
    // let lastScroll = 0;

    // window.addEventListener('scroll', function() {
    //     const currentScroll = window.pageYOffset;

    //     // Keep header transparent, only adjust header-bar opacity slightly on scroll if needed
    //     if (currentScroll > 100) {
    //         headerBar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(243, 244, 246, 0.95) 100%)';
    //     } else {
    //         headerBar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(243, 244, 246, 0.85) 100%)';
    //     }

    //     lastScroll = currentScroll;
    // });

    // ============================================
    // PARALLAX SCROLLING EFFECT (Subtle & Performance Optimized)
    // ============================================
    function initParallax() {
        // Only apply parallax on desktop for performance
        if (window.innerWidth <= 768) return;

        // Support multiple hero image classes across different pages
        const heroImages = document.querySelectorAll('.hero-bg-img, .about-hero-img, .projects-hero-img');

        // Handle hanging images separately to preserve centering
        const hangingImageContainers = document.querySelectorAll('.hero-hanging-image');

        if (heroImages.length > 0 || hangingImageContainers.length > 0) {
            let ticking = false;

            window.addEventListener('scroll', function () {
                if (!ticking) {
                    window.requestAnimationFrame(function () {
                        const scrolled = window.pageYOffset;
                        const speed = 0.25; // Subtle parallax speed

                        // Apply parallax to regular hero images
                        heroImages.forEach(img => {
                            // Skip about-hero-img to prevent gray background glitch
                            if (img.classList.contains('about-hero-img')) {
                                img.style.transform = 'translate3d(0, 0, 0)';
                                return;
                            }

                            // Get the parent container to check bounds
                            const container = img.closest('.hero-section, .projects-hero-section, .hero-bg');

                            if (container) {
                                const containerTop = container.offsetTop;
                                const containerHeight = container.offsetHeight;
                                const containerBottom = containerTop + containerHeight;

                                // Only apply parallax when container is in viewport
                                if (scrolled >= containerTop && scrolled <= containerBottom) {
                                    // Calculate parallax relative to container position
                                    const relativeScroll = scrolled - containerTop;
                                    const yPos = -(relativeScroll * speed);

                                    // Limit parallax to prevent revealing background
                                    const maxParallax = containerHeight * 0.1; // Max 10% of container height
                                    const limitedYPos = Math.max(-maxParallax, Math.min(0, yPos));

                                    img.style.transform = `translate3d(0, ${limitedYPos}px, 0)`;
                                } else if (scrolled < containerTop) {
                                    // Before container - reset
                                    img.style.transform = 'translate3d(0, 0, 0)';
                                } else {
                                    // Past container - keep final position
                                    const maxParallax = containerHeight * 0.1;
                                    img.style.transform = `translate3d(0, ${-maxParallax}px, 0)`;
                                }
                                img.style.willChange = 'transform';
                            } else {
                                // Fallback for images without container
                                const yPos = -(scrolled * speed);
                                img.style.transform = `translate3d(0, ${yPos}px, 0)`;
                                img.style.willChange = 'transform';
                            }
                        });

                        // Apply parallax to hanging image containers (preserve centering)
                        hangingImageContainers.forEach(container => {
                            const yPos = -(scrolled * 0.15); // Slower for hanging images
                            // Preserve the translateX(-50%) for centering, add Y parallax
                            container.style.transform = `translateX(-50%) translateY(${yPos}px)`;
                            container.style.willChange = 'transform';
                        });

                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    }

    // ============================================
    // ENHANCED FADE-IN ANIMATIONS ON SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards across all pages (excluding timeline-item and 2-column grids - handled separately)
    const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .why-choose-card, .leadership-card, .service-card-white, .content-image-wrapper, .newsletter-cta-box');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // STAGGERED ANIMATIONS FOR CARD GRIDS
    // ============================================
    function initStaggeredAnimations() {
        // Support all page-specific card containers (excluding projects-grid and blog-grid - handled separately)
        const cardContainers = document.querySelectorAll('.services-grid, .portfolio-cards, .blogs-cards, .testimonials-cards, .why-choose-grid, .leadership-grid, .timeline-content, .services-grid-3');

        cardContainers.forEach(container => {
            // Skip containers that are projects-grid or blog-grid (handled by two-column animations)
            if (container.classList.contains('projects-grid') || container.classList.contains('blog-grid')) {
                return;
            }

            // Support all card types across pages
            const cards = container.querySelectorAll('.service-card, .portfolio-card, .blog-card, .testimonial-card, .why-choose-card, .leadership-card, .service-card-white');

            cards.forEach((card, index) => {
                // Only add delay if not already animated
                if (!card.classList.contains('fade-in')) {
                    const delay = index * 0.08; // Subtle stagger
                    card.style.transitionDelay = `${delay}s`;
                }
            });
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT (Subtle Enhancement)
    // ============================================
    function initHeaderScroll() {
        const headerBar = document.querySelector('.header-bar');
        if (!headerBar) return;

        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    const currentScroll = window.pageYOffset;

                    // Add scrolled class for enhanced backdrop
                    if (currentScroll > 50) {
                        headerBar.classList.add('scrolled');
                    } else {
                        headerBar.classList.remove('scrolled');
                    }

                    lastScroll = currentScroll;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ============================================
    // TEXT REVEAL ANIMATIONS
    // ============================================
    function initTextAnimations() {
        // Support all page-specific title classes
        const textElements = document.querySelectorAll('.hero-title, .section-title, .portfolio-title, .blogs-title, .testimonials-title, .timeline-main-title, .leadership-header h2, .vision-content h2');

        if (textElements.length === 0) return;

        const textObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-revealed');
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        textElements.forEach(text => {
            // Only animate if not already visible (to avoid flash)
            if (text.offsetParent !== null) {
                text.style.opacity = '0';
                text.style.transform = 'translateY(20px)';
                text.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                textObserver.observe(text);
            }
        });
    }

    // ============================================
    // NUMBER COUNTER ANIMATION
    // ============================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number, .stat-value');
        if (counters.length === 0) return;

        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element) {
        const text = element.textContent.trim();
        const match = text.match(/(\d+\.?\d*)/);
        if (!match) return;

        const target = parseFloat(match[1]);
        if (isNaN(target) || target <= 0) return;

        const suffix = text.replace(match[0], '').trim();
        const originalText = text;
        let current = 0;
        const increment = target / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                // Restore original text format
                element.textContent = originalText;
                clearInterval(timer);
            } else {
                const displayValue = current.toFixed(target % 1 === 0 ? 0 : 1);
                element.textContent = displayValue + suffix;
            }
        }, stepTime);
    }

    // ============================================
    // CARD HOVER EFFECTS (Handled by CSS)
    // ============================================
    // Hover effects are handled purely by CSS for better performance
    // No JavaScript needed - CSS transitions handle this smoothly

    // ============================================
    // ADD FADE-IN CLASS STYLES DYNAMICALLY
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .text-revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // TIMELINE LINE & ITEMS ANIMATION ON SCROLL
    // ============================================
    function initTimelineLineAnimation() {
        const timelineContent = document.querySelector('.timeline-content');
        if (!timelineContent) return;

        const timelineSection = document.querySelector('.timeline-section');
        if (!timelineSection) return;

        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) return;

        // Initialize timeline items with fade-in styles
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.willChange = 'opacity, transform';
        });

        // Track scroll direction
        let lastScrollY = window.pageYOffset || window.scrollY;

        // Update timeline line and items based on scroll progress
        let ticking = false;

        function updateTimeline() {
            const scrollY = window.pageYOffset || window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollingDown = scrollY > lastScrollY;
            lastScrollY = scrollY;

            // Get section position
            const sectionTop = timelineSection.offsetTop;
            const sectionHeight = timelineSection.offsetHeight;

            // Calculate timeline line progress
            const startOffset = windowHeight * 0.2;
            const animationStart = sectionTop - startOffset;
            const animationEnd = sectionTop + sectionHeight - windowHeight + startOffset;
            const animationRange = animationEnd - animationStart;

            let lineProgress = 0;
            if (scrollY >= animationStart && scrollY <= animationEnd) {
                lineProgress = (scrollY - animationStart) / animationRange;
                lineProgress = Math.max(0, Math.min(1, lineProgress));
            } else if (scrollY > animationEnd) {
                lineProgress = 1;
            }
            timelineContent.style.setProperty('--timeline-line-progress', lineProgress);

            // Update each timeline item
            timelineItems.forEach((item, index) => {
                const itemTop = item.offsetTop;
                const itemHeight = item.offsetHeight;
                const itemBottom = itemTop + itemHeight;

                // Trigger point: when item reaches 60% of viewport
                const triggerPoint = scrollY + windowHeight * 0.6;

                // Check if item has been scrolled past (downward)
                const hasBeenScrolledPast = scrollY > itemTop - windowHeight * 0.4;

                // Check if scrolling back up past the item
                const isAboveTrigger = scrollY < itemTop - windowHeight * 0.6;

                if (hasBeenScrolledPast && !isAboveTrigger) {
                    // Item should be visible
                    if (item.style.opacity !== '1') {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.dataset.visible = 'true';
                    }
                } else if (isAboveTrigger && item.dataset.visible === 'true') {
                    // Scrolled back up - hide it
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    item.dataset.visible = 'false';
                } else if (!hasBeenScrolledPast) {
                    // Not reached yet - keep hidden
                    if (item.style.opacity !== '0') {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                    }
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateTimeline);
                ticking = true;
            }
        });

        // Initial calculation
        updateTimeline();
    }

    // ============================================
    // TWO-COLUMN GRID ANIMATIONS (Projects & Blogs)
    // ============================================
    function initTwoColumnGridAnimations() {
        // Projects grid
        const projectsGrid = document.querySelector('.projects-grid');
        const projectCards = document.querySelectorAll('.project-card');

        // Blogs grid
        const blogsGrid = document.querySelector('.blog-grid');
        const blogCards = document.querySelectorAll('.blog-grid .blog-card');

        // Function to animate cards based on column position
        function setupGridAnimation(cards, gridSelector) {
            if (cards.length === 0) return;

            cards.forEach((card, index) => {
                // Determine if card is in left column (even index) or right column (odd index)
                const isLeftColumn = index % 2 === 0;

                // Set initial state
                card.style.opacity = '0';
                card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.willChange = 'opacity, transform';

                if (isLeftColumn) {
                    // Left column: fade in from left
                    card.style.transform = 'translateX(-80px)';
                } else {
                    // Right column: fade in from right
                    card.style.transform = 'translateX(80px)';
                }

                // Create observer for this card
                const cardObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Card entered viewport - animate in
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                            cardObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.15,
                    rootMargin: '0px 0px -100px 0px'
                });

                cardObserver.observe(card);
            });
        }

        // Setup animations for both grids
        setupGridAnimation(projectCards, '.projects-grid');
        setupGridAnimation(blogCards, '.blog-grid');
    }

    // ============================================
    // VISION SECTION ANIMATIONS (About Us)
    // ============================================
    function initVisionSectionAnimation() {
        const visionSection = document.querySelector('.vision-section');
        if (!visionSection) return;

        const visionImageWrapper = document.querySelector('.vision-image-wrapper');
        const visionContent = document.querySelector('.vision-content');

        if (!visionImageWrapper || !visionContent) return;

        // Set initial states
        visionImageWrapper.style.opacity = '0';
        visionImageWrapper.style.transform = 'translateX(-80px)';
        visionImageWrapper.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        visionImageWrapper.style.willChange = 'opacity, transform';

        visionContent.style.opacity = '0';
        visionContent.style.transform = 'translateX(80px)';
        visionContent.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        visionContent.style.willChange = 'opacity, transform';

        // Create observer for the section
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Section entered viewport - animate both elements
                    visionImageWrapper.style.opacity = '1';
                    visionImageWrapper.style.transform = 'translateX(0)';

                    visionContent.style.opacity = '1';
                    visionContent.style.transform = 'translateX(0)';

                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        sectionObserver.observe(visionSection);
    }

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    function initScrollProgress() {
        // Create scroll progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        function updateScrollProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollableHeight = documentHeight - windowHeight;
            const scrollProgress = (scrollTop / scrollableHeight) * 100;

            progressBar.style.width = Math.min(scrollProgress, 100) + '%';
        }

        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    updateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial calculation
        updateScrollProgress();
    }

    // ============================================
    // INITIALIZE ALL ANIMATIONS
    // ============================================
    initParallax();
    initStaggeredAnimations();
    initHeaderScroll();
    initTextAnimations();
    initCounterAnimation();
    initTimelineLineAnimation();
    initTwoColumnGridAnimations();
    initVisionSectionAnimation();
    initScrollProgress();
    // Card hover effects handled by CSS for better performance
    // ============================================
    // CAREERS PAGE FILTERING
    // ============================================
    function initCareerFiltering() {
        const deptFilter = document.getElementById('department-filter');
        const locFilter = document.getElementById('location-filter');

        if (!deptFilter || !locFilter) return;

        const jobCards = document.querySelectorAll('.job-card');
        const deptGroups = document.querySelectorAll('.department-group');

        function filterJobs() {
            const selectedDept = deptFilter.value.toLowerCase();
            const selectedLoc = locFilter.value.toLowerCase();

            // Filter individual cards
            jobCards.forEach(card => {
                const cardDept = card.getAttribute('data-department') || '';
                const cardLoc = card.getAttribute('data-location') || '';

                const deptMatch = selectedDept === '' || cardDept === selectedDept;
                const locMatch = selectedLoc === '' || cardLoc === selectedLoc;

                if (deptMatch && locMatch) {
                    card.style.display = 'block';
                    // Re-trigger fade-in if needed, or ensuring opacity is 1
                    if (card.style.opacity === '0') {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                } else {
                    card.style.display = 'none';
                }
            });

            // Handle empty department groups
            deptGroups.forEach(group => {
                let hasVisible = false;
                const cards = group.querySelectorAll('.job-card');
                cards.forEach(c => {
                    if (c.style.display !== 'none') hasVisible = true;
                });

                if (hasVisible) {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });
        }

        deptFilter.addEventListener('change', filterJobs);
        locFilter.addEventListener('change', filterJobs);
    }

    initCareerFiltering();


    // ============================================
    // PREMIUM ANIMATIONS LOGIC (v2.0)
    // ============================================
    function initPremiumAnimations() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        // 1. Intersection Observer for Reveals (Job Cards, Location Cards, Contact Form)
        const revealConfig = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // Stagger logic for job cards mainly
                    const delay = el.dataset.delay || 0;

                    setTimeout(() => {
                        el.classList.add('is-visible');
                    }, delay);

                    revealObserver.unobserve(el);
                }
            });
        }, revealConfig);

        // Target Elements
        document.querySelectorAll('.job-card').forEach((el, idx) => {
            // Add stagger based on visually perceived row/order
            // Simple generic stagger: (index % 3) * 100ms
            const staggerDelay = (idx % 3) * 100;
            el.dataset.delay = staggerDelay;
            revealObserver.observe(el);
        });

        document.querySelectorAll('.location-card').forEach((el, idx) => {
            el.dataset.delay = idx * 150; // Sequential stagger for locations
            revealObserver.observe(el);
        });

        const contactForm = document.querySelector('.contact-form');
        if (contactForm) revealObserver.observe(contactForm);

        // 2. Magnetic Buttons (Magnetic Pull Effect) - Desktop Only
        if (window.matchMedia('(hover: hover)').matches) {
            const magnets = document.querySelectorAll('.magnetic-btn');
            magnets.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    // Calculate distance from center
                    const cX = rect.width / 2;
                    const cY = rect.height / 2;

                    const deltaX = (x - cX) / 4; // Intensity divisor
                    const deltaY = (y - cY) / 4;

                    btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate(0, 0)';
                });
            });
        }

        // Ripple Effect Click (All Devices)
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.classList.add('ripple-wave');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                btn.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // 3. Accordion / Drawer Logic (Location Cards)
        document.querySelectorAll('.location-card').forEach(card => {
            const toggle = card.querySelector('.location-name');
            if (toggle) {
                toggle.addEventListener('click', () => {
                    const isOpen = card.classList.contains('is-open');

                    // Close others? Optional. Let's keep others open for comparison or close for focus.
                    // Premium feel often implies focus, so let's close others.
                    document.querySelectorAll('.location-card.is-open').forEach(openCard => {
                        if (openCard !== card) openCard.classList.remove('is-open');
                    });

                    card.classList.toggle('is-open');
                });
            }
        });

        // 4. Form Interactions (Focus Spotlight & Button Morph)
        const inputs = document.querySelectorAll('.form-group input, .form-group select');
        inputs.forEach(input => {
            // Floater Logic
            const checkValue = () => {
                const parent = input.closest('.form-group');
                if (input.value.trim() !== '') parent.classList.add('has-value');
                else parent.classList.remove('has-value');
            };

            input.addEventListener('focus', () => {
                input.closest('.form-group').classList.add('has-focus');
            });

            input.addEventListener('blur', () => {
                input.closest('.form-group').classList.remove('has-focus');
                checkValue();
            });

            // Check initial value
            checkValue();
        });

        // Submit Button Morph
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('.submit-btn');
                if (btn) {
                    const originalText = btn.innerHTML; // Save content including SVG
                    btn.classList.add('is-loading');

                    // Simulate API call
                    setTimeout(() => {
                        btn.classList.remove('is-loading');
                        btn.innerHTML = `<svg class="checkmark-svg" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Sent!`;

                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            form.reset();
                            // Reset floating labels
                            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-value'));
                        }, 2000);
                    }, 2000);
                }
            });
        }
    }

    // Init
    initPremiumAnimations();

}); // End DOMContentLoaded
