
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="navbar">
    <a href="#" class="brand">Vesper<span>.</span></a>

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
    <section class="hero">
      <div class="hero-topline">
        <span>INDEPENDENT PHOTOGRAPHY</span>
        <span>MUNICH · AVAILABLE WORLDWIDE</span>
      </div>

      <div class="hero-heading">
        <p class="eyebrow">PHOTOGRAPHY & VISUAL STORIES</p>
        <h1>Every frame<br />carries <em>something.</em></h1>
        <p class="hero-description">
          Moments pass. Feelings remain. I photograph the things
          that deserve to stay.
        </p>
      </div>

      <div class="hero-image">
        <img
          src="src/assets/1.jpg"
          alt="An intimate wedding moment"
        />
        <div class="image-caption">
          <span>01 — THE ART OF BEING PRESENT</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>

      <div class="hero-bottomline">
        <span>PEOPLE. PLACES. PASSING MOMENTS.</span>
        <span>EST. 2026</span>
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
              src="src/assets/2.jpg"
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
              src="src/assets/3.jpg"
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
              src="src/assets/4.jpg"
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
              src="src/assets/5.jpg"
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
      <a href="mailto:hello@bhar.photo" class="contact-link">
        Start a conversation ↗
      </a>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-top">
      <a href="#" class="footer-brand">BHAR<span>.</span></a>
      <p>Every frame carries something.</p>
    </div>

    <div class="footer-bottom">
      <span>PHOTOGRAPHY · VISUAL STORIES</span>
      <span>— BY TUSHAR BHARDWAJ</span>
      <span>© ${new Date().getFullYear()} BHAR.</span>
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
