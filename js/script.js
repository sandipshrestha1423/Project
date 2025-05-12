document.addEventListener('DOMContentLoaded', () => {
    // --- Site Header Scroll Effect ---
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const isOpen = mobileMenu.classList.contains('open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen.toString());
             // Change icon based on state (optional, requires SVG or different icons)
            if (isOpen) {
                mobileMenuToggle.innerHTML = '<svg class="icon-x" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
            } else {
                 mobileMenuToggle.innerHTML = '<svg class="icon-menu" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>';
            }
        });
        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.innerHTML = '<svg class="icon-menu" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>';
            });
        });
    }
    
    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear().toString();
    }

    // --- Countdown Timer ---
    const countdownTimerElement = document.getElementById('countdown-timer');
    if (countdownTimerElement) {
        const eventDate = new Date('2025-07-15T00:00:00').getTime();
        const timerGrid = countdownTimerElement.querySelector('.timer-grid');

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference <= 0) {
                if (timerGrid) timerGrid.innerHTML = '<p class="festival-on">The Festival Is On! See You There!</p>';
                if(countdownTimerElement.querySelector('h2')) countdownTimerElement.querySelector('h2').style.display = 'none';
                clearInterval(timerInterval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (timerGrid) {
                timerGrid.innerHTML = `
                    <div class="timer-component"><span>${String(days).padStart(2, '0')}</span><span>Days</span></div>
                    <div class="timer-component"><span>${String(hours).padStart(2, '0')}</span><span>Hours</span></div>
                    <div class="timer-component"><span>${String(minutes).padStart(2, '0')}</span><span>Minutes</span></div>
                    <div class="timer-component"><span>${String(seconds).padStart(2, '0')}</span><span>Seconds</span></div>
                `;
            }
        };
        const timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // --- Tabs for Lineup ---
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            trigger.classList.add('active');
            const targetTabId = trigger.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // --- Lineup Data and Rendering ---
    const lineupData = {
      day1: [
        { name: 'DJ Electra', time: '6:00 PM - 7:30 PM', stage: 'Main Stage Alpha', genre: 'EDM / Future Bass', image: 'https://picsum.photos/seed/artist1/400/400', dataAiHint: 'DJ performing lights' },
        { name: 'The Cosmic Keys', time: '7:45 PM - 9:00 PM', stage: 'Galaxy Tent', genre: 'Indie Rock / Psychedelic', image: 'https://picsum.photos/seed/artist2/400/400', dataAiHint: 'band stage indie' },
        { name: 'Synthwave Sirens', time: '9:15 PM - 10:30 PM', stage: 'Neon Alley Stage', genre: 'Synthwave / Retro Electro', image: 'https://picsum.photos/seed/artist3/400/400', dataAiHint: 'female singer neon' },
        { name: 'Acoustic Echoes', time: '5:00 PM - 6:30 PM', stage: 'Chill Zone Oasis', genre: 'Acoustic / Folk Pop', image: 'https://picsum.photos/seed/artist4/400/400', dataAiHint: 'guitarist acoustic singer' },
      ],
      day2: [
        { name: 'Groove Masters Inc.', time: '5:30 PM - 7:00 PM', stage: 'Main Stage Alpha', genre: 'Funk / Soul Fusion', image: 'https://picsum.photos/seed/artist5/400/400', dataAiHint: 'funk band stage' },
        { name: 'Ambient Dreams Collective', time: '7:15 PM - 8:30 PM', stage: 'Galaxy Tent', genre: 'Ambient / Downtempo', image: 'https://picsum.photos/seed/artist6/400/400', dataAiHint: 'electronic music artist' },
        { name: 'Techno Titans Crew', time: '8:45 PM - 10:00 PM', stage: 'Neon Alley Stage', genre: 'Techno / Minimal', image: 'https://picsum.photos/seed/artist7/400/400', dataAiHint: 'DJ techno dark' },
        { name: 'Folk Harmonies Trio', time: '6:00 PM - 7:30 PM', stage: 'Chill Zone Oasis', genre: 'Folk / World Music', image: 'https://picsum.photos/seed/artist8/400/400', dataAiHint: 'folk band singing' },
      ],
      day3: [
        { name: 'Rock Legends United', time: '6:30 PM - 8:00 PM', stage: 'Main Stage Alpha', genre: 'Classic Rock / Hard Rock', image: 'https://picsum.photos/seed/artist9/400/400', dataAiHint: 'rock concert guitarist' },
        { name: 'Jazz Fusion Xperience', time: '8:15 PM - 9:30 PM', stage: 'Galaxy Tent', genre: 'Jazz Fusion / Experimental', image: 'https://picsum.photos/seed/artist10/400/400', dataAiHint: 'jazz band saxophone' },
        { name: 'Hip Hop Icons Showcase', time: '9:45 PM - 11:00 PM', stage: 'Neon Alley Stage', genre: 'Hip Hop / Rap', image: 'https://picsum.photos/seed/artist11/400/400', dataAiHint: 'rapper stage microphone' },
        { name: 'Reggae Rhythms Revolution', time: '7:00 PM - 8:30 PM', stage: 'Chill Zone Oasis', genre: 'Reggae / Dub', image: 'https://picsum.photos/seed/artist12/400/400', dataAiHint: 'reggae singer dreadlocks' },
      ],
    };

    function createArtistCard(artist) {
        return `
            <div class="artist-card">
                <div class="artist-image">
                    <img src="${artist.image}" alt="${artist.name}" data-ai-hint="${artist.dataAiHint}">
                </div>
                <div class="artist-card-content">
                    <div>
                        <h4>${artist.name}</h4>
                        <p><svg class="icon-music" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path></svg>${artist.genre}</p>
                        <p><svg class="icon-clock" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>${artist.time}</p>
                    </div>
                </div>
                <div class="artist-card-footer">
                     <p><svg class="icon-users" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>${artist.stage}</p>
                </div>
            </div>
        `;
    }

    Object.keys(lineupData).forEach(dayKey => {
        const dayContentElement = document.getElementById(dayKey);
        const artistGrid = dayContentElement ? dayContentElement.querySelector('.artist-grid') : null;
        if (artistGrid) {
            lineupData[dayKey].forEach(artist => {
                artistGrid.innerHTML += createArtistCard(artist);
            });
        }
    });
    
    // --- Ticket Tiers Data and Rendering ---
    const ticketTiers = [
      {
        icon: '<svg class="icon-check-circle card-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 12.17l7.59-7.59L19 6l-9 9z"></path></svg>',
        title: 'General Admission',
        price: '$129',
        duration: '/ 3-Day Pass',
        features: ['Full 3-Day Access', 'All Main Stages & Tents', 'Food & Art Village Entry', 'General Camping Zone'],
        dataAiHint: 'festival ticket basic general',
        ctaText: 'Get General Pass',
        buttonClass: 'outline-button',
      },
      {
        icon: '<svg class="icon-star card-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>',
        title: 'VIP Experience',
        price: '$249',
        duration: '/ 3-Day Pass',
        features: ['All General Perks', 'VIP Lounge Access', 'Priority Stage Viewing Areas', 'Exclusive Merch Pack', 'Premium Camping Zone', 'Dedicated VIP Bars'],
        dataAiHint: 'festival ticket vip premium',
        ctaText: 'Unlock VIP Access',
        isPopular: true,
        buttonClass: 'primary-button',
      },
      {
        icon: '<svg class="icon-users card-icon" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>',
        title: 'Group Pass (4+)',
        price: '$109',
        duration: '/person / 3-Day',
        features: ['Full 3-Day Access (per person)', 'Discounted Group Rate', 'Reserved Group Camping Area Option', 'Shared Memories Guaranteed!'],
        dataAiHint: 'festival ticket group friends',
        ctaText: 'Book Group Pass',
        buttonClass: 'outline-button',
      },
    ];

    const ticketGrid = document.querySelector('#tickets .ticket-grid');
    if (ticketGrid) {
        ticketTiers.forEach(tier => {
            const card = document.createElement('div');
            card.classList.add('ticket-card');
            if (tier.isPopular) card.classList.add('popular');
            card.setAttribute('data-ai-hint', tier.dataAiHint);

            let featuresHTML = '';
            tier.features.forEach(feature => {
                featuresHTML += `<li><svg class="icon-check-circle" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 12.17l7.59-7.59L19 6l-9 9z"></path></svg> ${feature}</li>`;
            });

            card.innerHTML = `
                ${tier.isPopular ? '<div class="popular-badge">MOST POPULAR CHOICE</div>' : ''}
                ${tier.icon}
                <h4>${tier.title}</h4>
                <div class="price">${tier.price}<span class="duration">${tier.duration}</span></div>
                <ul>${featuresHTML}</ul>
                <a href="#" class="button ${tier.buttonClass}">${tier.ctaText}</a>
            `;
            ticketGrid.appendChild(card);
        });
    }


    // --- Gallery Data and Modal ---
    const galleryImages = [
      { src: 'https://picsum.photos/seed/g1/600/400', alt: 'Vibrant festival crowd dancing', dataAiHint: 'festival crowd dancing' },
      { src: 'https://picsum.photos/seed/g2/400/600', alt: 'Artist performing on a brightly lit stage', dataAiHint: 'singer stage lights' },
      { src: 'https://picsum.photos/seed/g3/600/400', alt: 'Colorful abstract art installation at night', dataAiHint: 'art installation colorful' },
      { src: 'https://picsum.photos/seed/g4/600/400', alt: 'Attendees enjoying the festival atmosphere', dataAiHint: 'people festival fun' },
      { src: 'https://picsum.photos/seed/g5/400/600', alt: 'Stunning sunset over the festival grounds', dataAiHint: 'festival sunset view' },
      { src: 'https://picsum.photos/seed/g6/600/400', alt: 'Unique food truck offerings at the festival', dataAiHint: 'food truck festival' },
      { src: 'https://picsum.photos/seed/g7/600/400', alt: 'Spectacular laser show illuminating the night sky', dataAiHint: 'laser show concert' },
      { src: 'https://picsum.photos/seed/g8/400/600', alt: 'DJ mixing tracks on sophisticated equipment', dataAiHint: 'DJ equipment music' },
    ];
    
    const galleryGrid = document.querySelector('#gallery .gallery-grid');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeButton = modal ? modal.querySelector('.close-button') : null;

    if (galleryGrid && modal && modalImg && closeButton) {
        galleryImages.forEach(imgData => {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.setAttribute('data-ai-hint', imgData.dataAiHint);
            item.innerHTML = `
                <img src="${imgData.src}" alt="${imgData.alt}">
                <div class="overlay">
                    <svg class="icon-maximize" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></svg>
                </div>
            `;
            item.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = imgData.src;
                modalImg.alt = imgData.alt;
            });
            galleryGrid.appendChild(item);
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Close if backdrop is clicked
                modal.style.display = 'none';
            }
        });
    }

    // --- Contact Form Validation and Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');
            const submitButton = contactForm.querySelector('button[type="submit"]');

            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            if (nameInput.value.trim() === '') {
                document.getElementById('name-error').textContent = 'Full name is required.';
                isValid = false;
            }
            if (emailInput.value.trim() === '') {
                document.getElementById('email-error').textContent = 'Email address is required.';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                isValid = false;
            }
            if (messageInput.value.trim() === '') {
                document.getElementById('message-error').textContent = 'Message cannot be empty.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Message should be at least 10 characters long.';
                isValid = false;
            }

            if (!isValid) {
                showToast('Uh oh!', 'Please check the form for errors and try again.', 'destructive');
                return;
            }

            submitButton.disabled = true;
            submitButton.innerHTML = '<svg class="icon-send" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg> Sending...';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Form data submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
            showToast('Message Sent! 🚀', "Thanks for reaching out! We'll get back to you as soon as possible.");
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = '<svg class="icon-send" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg> Send Message';
        });
    }

    // --- Toast Notification System ---
    const toastContainer = document.getElementById('toast-container');
    function showToast(title, message, type = 'default') { // type can be 'default' or 'destructive'
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.classList.add('toast');
        if (type === 'destructive') {
            toast.classList.add('destructive');
        }
        toast.innerHTML = `
            <h4>${title}</h4>
            <p>${message}</p>
        `;
        toastContainer.appendChild(toast);
        
        // Trigger reflow to enable animation
        toast.offsetHeight; 
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300); // Match animation duration
        }, 4000); // Toast visibility duration
    }
    
    // --- Scroll Reveal ---
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.scrollDelay || 0) * 1000;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollRevealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // Apply initial scroll-reveal delays based on order of appearance in Hero, About, etc.
    // This is a simplified way, more robust might involve actual calculation of element position
    const sections = ['#hero', '#about', '#lineup', '#tickets', '#gallery', '#contact'];
    sections.forEach((selector, index) => {
        const sectionElement = document.querySelector(selector);
        if (sectionElement && sectionElement.classList.contains('scroll-reveal')) {
            // For hero, children elements already have animation delays.
            // For other sections, apply a base delay.
            if (selector !== '#hero') {
                 sectionElement.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
    // For individual elements inside hero that don't use scroll-reveal class but css animation
    const heroAnimatedElements = document.querySelectorAll('#hero .hero-content > *:not(.countdown)');
    heroAnimatedElements.forEach((el, index) => {
        el.style.animationDelay = `${(index +1) * 0.15}s`;
    });
     const countdownElement = document.querySelector('#hero .countdown');
    if(countdownElement) {
        countdownElement.style.animationDelay = `${(heroAnimatedElements.length + 1) * 0.15}s`;
    }


});
