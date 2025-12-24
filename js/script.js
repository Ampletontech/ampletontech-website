// ============================================
// Ampleton Website - Main JavaScript
// Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
        
        question.addEventListener('click', function() {
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
    const portfolioPrevBtn = document.querySelector('.portfolio-carousel .carousel-btn-prev');
    const portfolioNextBtn = document.querySelector('.portfolio-carousel .carousel-btn-next');
    
    if (portfolioCards && portfolioPrevBtn && portfolioNextBtn) {
        let portfolioScrollPosition = 0;
        const portfolioCardWidth = portfolioCards.querySelector('.portfolio-card').offsetWidth;
        const portfolioGap = 32; // gap between cards
        const portfolioScrollAmount = portfolioCardWidth + portfolioGap;
        
        portfolioNextBtn.addEventListener('click', function() {
            portfolioScrollPosition += portfolioScrollAmount;
            const maxScroll = portfolioCards.scrollWidth - portfolioCards.offsetWidth;
            if (portfolioScrollPosition > maxScroll) {
                portfolioScrollPosition = maxScroll;
            }
            portfolioCards.scrollTo({
                left: portfolioScrollPosition,
                behavior: 'smooth'
            });
        });
        
        portfolioPrevBtn.addEventListener('click', function() {
            portfolioScrollPosition -= portfolioScrollAmount;
            if (portfolioScrollPosition < 0) {
                portfolioScrollPosition = 0;
            }
            portfolioCards.scrollTo({
                left: portfolioScrollPosition,
                behavior: 'smooth'
            });
        });
    }

    // Blogs Carousel
    const blogsCards = document.querySelector('.blogs-cards');
    const blogsPrevBtn = document.querySelector('.blogs-carousel .carousel-btn-prev');
    const blogsNextBtn = document.querySelector('.blogs-carousel .carousel-btn-next');
    
    if (blogsCards && blogsPrevBtn && blogsNextBtn) {
        let blogsScrollPosition = 0;
        const blogCardWidth = blogsCards.querySelector('.blog-card').offsetWidth;
        const blogGap = 32;
        const blogScrollAmount = blogCardWidth + blogGap;
        
        blogsNextBtn.addEventListener('click', function() {
            blogsScrollPosition += blogScrollAmount;
            const maxScroll = blogsCards.scrollWidth - blogsCards.offsetWidth;
            if (blogsScrollPosition > maxScroll) {
                blogsScrollPosition = maxScroll;
            }
            blogsCards.scrollTo({
                left: blogsScrollPosition,
                behavior: 'smooth'
            });
        });
        
        blogsPrevBtn.addEventListener('click', function() {
            blogsScrollPosition -= blogScrollAmount;
            if (blogsScrollPosition < 0) {
                blogsScrollPosition = 0;
            }
            blogsCards.scrollTo({
                left: blogsScrollPosition,
                behavior: 'smooth'
            });
        });
    }

    // Testimonials Carousel
    const testimonialsCards = document.querySelector('.testimonials-cards');
    const testimonialsPrevBtn = document.querySelector('.testimonials-carousel .carousel-btn-prev');
    const testimonialsNextBtn = document.querySelector('.testimonials-carousel .carousel-btn-next');
    
    if (testimonialsCards && testimonialsPrevBtn && testimonialsNextBtn) {
        let testimonialsScrollPosition = 0;
        const testimonialCardWidth = testimonialsCards.querySelector('.testimonial-card').offsetWidth;
        const testimonialGap = 32;
        const testimonialScrollAmount = testimonialCardWidth + testimonialGap;
        
        testimonialsNextBtn.addEventListener('click', function() {
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
        
        testimonialsPrevBtn.addEventListener('click', function() {
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
        newsletterBtn.addEventListener('click', function(e) {
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

    // Animate on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .testimonial-card, .why-choose-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add fade-in class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

