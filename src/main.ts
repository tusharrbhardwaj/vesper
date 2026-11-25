
import './style.css'
import celebration from './assets/2.jpg'
import cityArchitecture from './assets/3.jpg'
import landscape from './assets/4.jpg'
import portrait from './assets/5.jpg'

// Snowfall hero footage: a landscape crop for wide screens, the original vertical frame for phones.
const HERO_VIDEO = {
  landscape: {
    src: '/videos/vesper-winter-hero-landscape.mp4',
    poster: '/images/vesper-winter-poster-landscape.jpg',
  },
  portrait: {
    src: '/videos/vesper-winter-hero-portrait.mp4',
    poster: '/images/vesper-winter-poster-portrait.jpg',
  },
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="navbar navbar--over-video">
    <a href="#" class="brand">VESPER<span>.</span></a>

    <nav class="desktop-nav">
      <a href="#stories">Stories</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>

    <a href="#contact" class="nav-cta">
      Start a conversation <span>↗</span>
    </a>

    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">
      <span></span>
      <span></span>
    </button>
  </header>

  <main>
    <section class="hero-snow" aria-labelledby="hero-title">
      <video
        class="hero-video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      ></video>

      <div class="hero-light" aria-hidden="true"></div>
      <div class="hero-grade" aria-hidden="true"></div>

      <!-- The wordmark as a shadow lying on the lit snow. Pure HTML/CSS, never burned into the video. -->
      <div class="shadow-stage" aria-hidden="true">
        <div class="shadow-plane">
          <span class="shadow-word shadow-core">VESPER.</span>
          <span class="shadow-word shadow-penumbra">VESPER.</span>
        </div>
      </div>

      <div class="hero-grain" aria-hidden="true"></div>

      <div class="hero-copy">
        <h1 id="hero-title" class="visually-hidden">VESPER.</h1>
        <p class="hero-label">Photography · Visual Stories</p>
        <p class="hero-tagline">We know the emotions<br />behind moments.</p>
      </div>

      <div class="hero-foot">
        <span class="hero-index">N° 01 — Winter, after dark</span>
        <a href="#stories" class="scroll-cue">
          Scroll to feel more <span class="cue-arrow">↓</span>
        </a>
      </div>
    </section>

    <section class="stories section-padding" id="stories">
      <div class="section-heading">
        <div>
          <p class="eyebrow">A COLLECTION OF MOMENTS</p>
          <h2>Selected <em>stories.</em></h2>
        </div>
        <a href="#contact" class="text-link">Explore all stories ↗</a>
      </div>

      <div class="story-grid">
        <article class="story-card story-large">
          <div class="story-image">
            <img
              src="${celebration}"
              alt="Wedding celebration"
              loading="lazy"
            />
          </div>
          <div class="story-meta">
            <div>
              <h3>In the presence of love</h3>
              <p>PEOPLE & WEDDINGS</p>
            </div>
            <span>01 / 04</span>
          </div>
        </article>

        <article class="story-card story-offset">
          <div class="story-image">
            <img
              src="${cityArchitecture}"
              alt="City architecture"
              loading="lazy"
            />
          </div>
          <div class="story-meta">
            <div>
              <h3>Between the streets</h3>
              <p>STREET & URBAN</p>
            </div>
            <span>02 / 04</span>
          </div>
        </article>

        <article class="story-card">
          <div class="story-image">
            <img
              src="${landscape}"
              alt="Sunrise over a landscape"
              loading="lazy"
            />
          </div>
          <div class="story-meta">
            <div>
              <h3>Somewhere, slowly</h3>
              <p>PLACES & TRAVEL</p>
            </div>
            <span>03 / 04</span>
          </div>
        </article>

        <article class="story-card story-offset-small">
          <div class="story-image">
            <img
              src="${portrait}"
              alt="Portrait of a woman"
              loading="lazy"
            />
          </div>
          <div class="story-meta">
            <div>
              <h3>Beyond the gaze</h3>
              <p>PORTRAITS</p>
            </div>
            <span>04 / 04</span>
          </div>
        </article>
      </div>
    </section>

    <section class="manifesto" id="about">
      <p class="eyebrow">A THOUGHT BEHIND THE LENS</p>
      <h2>
        Not everything meaningful<br />
        needs to be <em>said.</em>
      </h2>
      <p class="manifesto-copy">
        Some things are found in a glance, a quiet gesture,
        a fleeting afternoon. Photography, to me, is about
        recognising those moments before they disappear.
      </p>
      <span class="signature">— Tushar Bhardwaj</span>
    </section>

    <section class="contact section-padding" id="contact">
      <p class="eyebrow">HAVE A STORY IN MIND?</p>
      <h2>Let's make<br /><em>something matter.</em></h2>
      <a href="mailto:hello@vesper.photo" class="contact-link">
        Start a conversation ↗
      </a>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-top">
      <a href="#" class="footer-brand">VESPER<span>.</span></a>
      <p>Every frame carries something.</p>
    </div>

    <div class="footer-bottom">
      <span>PHOTOGRAPHY · VISUAL STORIES</span>
      <span>— BY TUSHAR BHARDWAJ</span>
      <span>© ${new Date().getFullYear()} VESPER.</span>
    </div>
  </footer>
`

// Mobile navigation
const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
const navbar = document.querySelector<HTMLElement>('.navbar')

menuToggle?.addEventListener('click', () => {
  const isOpen = navbar?.classList.toggle('menu-open') ?? false

  menuToggle.setAttribute('aria-expanded', String(isOpen))
  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation' : 'Open navigation'
  )
})

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navbar?.classList.remove('menu-open')
    menuToggle?.setAttribute('aria-expanded', 'false')
  })
})

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12 }
)

document.querySelectorAll('.story-card, .manifesto, .contact').forEach((item) => {
  item.classList.add('reveal')
  revealObserver.observe(item)
})

// Snowfall hero: pick the crop that suits the screen, keep it muted and looping.
const heroVideo = document.querySelector<HTMLVideoElement>('.hero-video')
const wideScreen = window.matchMedia('(min-aspect-ratio: 4/5)')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function loadHeroVideo() {
  if (!heroVideo) return
  const { src, poster } = wideScreen.matches ? HERO_VIDEO.landscape : HERO_VIDEO.portrait
  if (heroVideo.getAttribute('src') === src) return

  heroVideo.poster = poster
  heroVideo.src = src
  heroVideo.muted = true // required for autoplay on iOS and Chrome

  if (reducedMotion.matches) {
    heroVideo.removeAttribute('autoplay')
    return
  }
  heroVideo.play().catch(() => {
    /* autoplay blocked (e.g. low-power mode): the poster stays visible */
  })
}

loadHeroVideo()
wideScreen.addEventListener('change', loadHeroVideo)
document.querySelector('.hero-snow')?.classList.add('is-ready')
