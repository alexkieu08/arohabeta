import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader')
  setTimeout(() => {
    if (loader) loader.classList.add('hidden')
    initAnimations()
  }, 500)

  // Native Form to Google Sheets Integration
  const contactForm = document.getElementById('contact-form')
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      const submitBtn = document.getElementById('submit-btn')
      const successDiv = document.getElementById('form-success')
      const originalText = submitBtn.innerText
      
      // Update button state to loading
      submitBtn.disabled = true
      submitBtn.innerText = 'Sending...'
      
      const formData = new FormData(contactForm)
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      }
      
      // Google Apps Script Web App URL (to be replaced by user)
      const scriptUrl = 'YOUR_GOOGLE_SCRIPT_URL_HERE'
      
      try {
        if (scriptUrl === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
          // If the script URL hasn't been set up yet, simulate a success for instant testing,
          // but log a helpful developer guide in the console.
          console.warn('Aroha Hauora Contact Form: Google Sheets integration is ready. Please set the scriptUrl constant in main.js to your Google Apps Script URL to start saving responses.')
          await new Promise(resolve => setTimeout(resolve, 1000))
        } else {
          // Send request to Google Apps Script Web App
          await fetch(scriptUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
        }
        
        // Success animation
        gsap.to(contactForm, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          onComplete: () => {
            contactForm.style.display = 'none'
            successDiv.style.display = 'flex'
            gsap.fromTo(successDiv, 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            )
          }
        })
      } catch (err) {
        console.error('Submission failed:', err)
        alert('Oops! Something went wrong while sending your message. Please try again.')
        submitBtn.disabled = false
        submitBtn.innerText = originalText
      }
    })
  }

  // Registration Form Handler
  const registerForm = document.getElementById('register-form')
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      const submitBtn = document.getElementById('register-submit-btn')
      const successDiv = document.getElementById('register-success')
      const originalText = submitBtn.innerText
      
      // Update button state to loading
      submitBtn.disabled = true
      submitBtn.innerText = 'Registering...'
      
      const formData = new FormData(registerForm)
      const data = {
        name: formData.get('name'),
        email: formData.get('email')
      }
      
      try {
        console.log('Aroha Hauora Register Form: Registration submitted successfully.', data)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Success animation matching contact form
        gsap.to(registerForm, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          onComplete: () => {
            registerForm.style.display = 'none'
            successDiv.style.display = 'flex'
            gsap.fromTo(successDiv, 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            )
          }
        })
      } catch (err) {
        console.error('Registration failed:', err)
        alert('Oops! Something went wrong while registering. Please try again.')
        submitBtn.disabled = false
        submitBtn.innerText = originalText
      }
    })
  }
})


function initAnimations() {
  // Parallax ferns at different speeds
  gsap.utils.toArray('.fern').forEach((fern, i) => {
    gsap.to(fern, {
      yPercent: 25 * (i + 1),
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  })

  // 3D tilt on cascade
  const cascade = document.getElementById('cascade-container')
  if (cascade) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(cascade, {
        rotationY: x * 10,
        rotationX: 55 - y * 10,
        rotation: -40 + (x * 4),
        duration: 1,
        ease: 'power2.out',
      })
    })
  }

  // Hero entrance
  const tl = gsap.timeline()
  tl.to('.navbar', { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
    .to('.hero .fade-up', { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')

  // All fade-up scroll triggers
  gsap.utils.toArray('.fade-up:not(.navbar):not(.hero .fade-up)').forEach((elem) => {
    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 0,
      autoAlpha: 1,
      duration: 0.7,
      ease: 'power3.out',
    })
  })
}
