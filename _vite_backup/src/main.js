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
