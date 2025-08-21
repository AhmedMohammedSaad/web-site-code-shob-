(function(){
  const y=document.getElementById('year');
  if(y) y.textContent=new Date().getFullYear();

  // Enhanced scroll reveal animation with staggered delays
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements in the same section
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('reveal-in');
        }, delay);
        
        // Unobserve after animation to improve performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });

  // Add staggered delays to elements in the same container
  revealElements.forEach((element, index) => {
    const container = element.closest('.features-grid, .download-grid, .contact-grid');
    if (container) {
      const elementsInContainer = container.querySelectorAll('.reveal');
      const elementIndex = Array.from(elementsInContainer).indexOf(element);
      element.dataset.delay = elementIndex * 150; // 150ms delay between elements
    }
    revealObserver.observe(element);
  });

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('reveal-in'));
  }

  // Enhanced parallax effect for hero section with smooth animations
  const hero = document.querySelector('.hero');
  const heroArt = document.querySelector('.hero-art img');
  let ticking = false;
  
  if(hero && heroArt){
    const handleParallax = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.3;
          const opacity = Math.max(0.3, 1 - scrolled / window.innerHeight);
          
          heroArt.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
          heroArt.style.opacity = opacity;
          
          // Add floating effect to hero content
          const heroContent = document.querySelector('.hero-copy');
          if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * -0.1}px)`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleParallax, { passive: true });
    
    // Add scroll-triggered animations for sections
    const addScrollAnimations = () => {
      const sections = document.querySelectorAll('section');
      
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
          } else {
            entry.target.style.transform = 'translateY(20px)';
            entry.target.style.opacity = '0.8';
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });
      
      sections.forEach(section => {
        section.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sectionObserver.observe(section);
      });
    };
    
    addScrollAnimations();
    
    // Mouse tracking for hero image
    const heroContainer = document.querySelector('.hero-art');
    if(heroContainer) {
      heroContainer.addEventListener('mousemove', (e) => {
        const rect = heroContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        const translateX = (x - centerX) / centerX * 15;
        const translateY = (y - centerY) / centerY * -10;
        
        heroArt.style.transform = `
          translateX(${translateX}px) 
          translateY(${translateY}px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(1.05)
        `;
      });
      
      heroContainer.addEventListener('mouseleave', () => {
        heroArt.style.transform = 'translateX(0) translateY(0) rotateX(0) rotateY(0) scale(1)';
      });
    }
  }

  // Mouse movement parallax for features
  const features = document.querySelectorAll('.feature');
  features.forEach(feature => {
    feature.addEventListener('mousemove', (e) => {
      const rect = feature.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      feature.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    feature.addEventListener('mouseleave', () => {
      feature.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Dynamic header background on scroll
  const header = document.querySelector('.site-header');
  if(header) {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100) {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'saturate(160%) blur(25px)';
      } else {
        header.style.background = 'rgba(255,255,255,0.85)';
        header.style.backdropFilter = 'saturate(160%) blur(20px)';
      }
    });
  }

  // Floating animation for cards on hover
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.animation = 'floatY 2s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.animation = 'none';
    });
  });

  // Magnetic effect for buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });



  // Text typing effect for hero title
  const heroTitle = document.querySelector('.hero-copy h1');
  if(heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if(i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  // Advanced 3D Interactive Effects
  const cards3D = document.querySelectorAll('.card');
  cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 8;
      const rotateY = (centerX - x) / 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      card.style.boxShadow = `
        0 ${Math.abs(rotateX)}px ${Math.abs(rotateX) * 2}px rgba(101,10,187,0.3),
        0 ${Math.abs(rotateY)}px ${Math.abs(rotateY) * 2}px rgba(101,10,187,0.2),
        0 0 40px rgba(101,10,187,0.1)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.boxShadow = '';
    });
  });

  // 3D Button Tilt Effect
  const buttons3D = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons3D.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      btn.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    });
  });

  // 3D Image Rotation Effect
  const images3D = document.querySelectorAll('.hero-art img, .screens-grid img');
  images3D.forEach(img => {
    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px) scale(1.02)`;
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    });
  });

  // 3D Scroll-triggered Animations
  const observer3D = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        if (element.classList.contains('card')) {
          element.style.animation = 'float3D 3s ease-in-out infinite';
        }
        
        if (element.classList.contains('btn-primary') || element.classList.contains('btn-secondary')) {
          element.style.animation = 'pulse3D 2s ease-in-out infinite';
        }
        
        if (element.querySelector('img')) {
          const img = element.querySelector('img');
          img.style.animation = 'rotate3D 8s ease-in-out infinite';
        }
      }
    });
  }, { threshold: 0.3 });

  // Observe elements for 3D animations
  document.querySelectorAll('.card, .btn-primary, .btn-secondary, .hero-art, .screens-grid').forEach(el => {
    observer3D.observe(el);
  });

  // Dynamic 3D Lighting Effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const lightX = (mouseX - 0.5) * 100;
    const lightY = (mouseY - 0.5) * 100;
    
    document.documentElement.style.setProperty('--light-x', `${lightX}px`);
    document.documentElement.style.setProperty('--light-y', `${lightY}px`);
    
    // Update shadows based on mouse position
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - cardCenterX) / 10;
      const deltaY = (e.clientY - cardCenterY) / 10;
      
      card.style.setProperty('--dynamic-shadow', `${deltaX}px ${deltaY}px 30px rgba(101,10,187,0.2)`);
    });
  });

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if(mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if(!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });
  }

  // Contact form functionality
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Show loading state
      showMessage('loading', '<div class="loading-spinner"></div>جاري إرسال الرسالة...');
      submitBtn.disabled = true;
      
      try {
         // Try to send email using EmailJS if available
         if (typeof emailjs !== 'undefined') {
           await emailjs.send('default_service', 'template_contact', {
             from_name: fullName,
             from_email: email,
             subject: subject,
             message: message,
             to_email: 'ahmedallmpe12@gmail.com'
           });
           showMessage('success', '✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
           contactForm.reset();
         } else {
           throw new Error('EmailJS not available');
         }
       } catch (error) {
         console.log('EmailJS failed, using mailto fallback:', error);
         // Fallback: Create mailto link
         const mailtoLink = `mailto:ahmedallmpe12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`الاسم: ${fullName}\nالبريد الإلكتروني: ${email}\n\nالرسالة:\n${message}`)}`;
         window.open(mailtoLink, '_blank');
         showMessage('success', '✅ تم فتح تطبيق البريد الإلكتروني لإرسال رسالتك.');
         contactForm.reset();
       } finally {
         submitBtn.disabled = false;
       }
    });
  }
  
  function showMessage(type, text) {
    formMessage.className = `form-message ${type}`;
    formMessage.innerHTML = text;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds for success/error
    if (type !== 'loading') {
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  }

})();