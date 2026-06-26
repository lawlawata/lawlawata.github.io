document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -10% 0px',
  });

  targets.forEach((target) => observer.observe(target));

  const parallaxTarget = document.querySelector('.character-parallax');
  const characterBase = document.querySelector('.character-base');
  const mocoLayers = Array.from(document.querySelectorAll('.moco-layer'));
  const mocoPlaceOverlay = document.querySelector('.moco-place-overlay');
  const mocoPlaceHitbox = document.querySelector('.moco-place-hitbox');
  const wrapper = document.querySelector('.scroll-tracking-wrapper');
  const heroLogo = document.querySelector('.hero-logo');
  const stickyButton = document.querySelector('.sticky-apply-button');
  const introBlock = document.querySelector('.intro-block');

  if (!parallaxTarget || !wrapper) {
    return;
  }

  let ticking = false;
  let startScroll = 0;
  let scrollable = 1;
  let maxShift = 0;

  const syncHeroLogo = () => {
    if (!heroLogo || !stickyButton) {
      return;
    }
    const header = document.querySelector('#header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const availableHeight = Math.max(window.innerHeight - headerHeight, 1);
    const characterWidth = Math.min(window.innerWidth, availableHeight);
    const buttonRect = stickyButton.getBoundingClientRect();
    const gap = Math.max(window.innerHeight - buttonRect.top, 0);
    const heightScale = Math.min(availableHeight / 2000, 1);
    parallaxTarget.style.setProperty('--character-width', `${characterWidth}px`);
    heroLogo.style.setProperty('--character-width', `${characterWidth}px`);
    heroLogo.style.setProperty('--hero-logo-bottom', `${Math.max(gap * heightScale, 8)}px`);
  };

  const syncIntroSpacing = () => {
    if (!heroLogo || !introBlock) {
      return;
    }
    const logoRect = heroLogo.getBoundingClientRect();
    const desiredTop = logoRect.bottom + (window.innerHeight * 0.5);
    const currentTop = introBlock.getBoundingClientRect().top;
    const currentMargin = parseFloat(window.getComputedStyle(introBlock).marginTop) || 0;
    const nextMargin = Math.max(currentMargin + (desiredTop - currentTop), window.innerHeight * 0.5);
    introBlock.style.setProperty('--intro-block-margin-top', `${nextMargin}px`);
  };

  const measureParallax = () => {
    const header = document.querySelector('#header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const viewportHeight = Math.max(window.innerHeight - headerHeight, 1);
    const renderedHeight = Math.max(parallaxTarget.getBoundingClientRect().height, 1);
    const desiredTop = Math.max(headerHeight + 16, 0);
    const visibleTop = renderedHeight * 0.146;
    parallaxTarget.style.setProperty('--parallax-base-y', `${desiredTop - visibleTop}px`);
    startScroll = wrapper.offsetTop;
    scrollable = Math.max(wrapper.offsetHeight - viewportHeight, 1);
    maxShift = Math.max(renderedHeight - viewportHeight, 0);
  };

  const syncMocoPlaceHitbox = () => {
    if (!characterBase || !mocoPlaceHitbox || !mocoPlaceOverlay) {
      return;
    }

    const baseRect = characterBase.getBoundingClientRect();
    if (baseRect.width <= 0 || baseRect.height <= 0) {
      mocoPlaceHitbox.style.display = 'none';
      return;
    }

    const hitboxLeft = baseRect.left + baseRect.width * 0.8635;
    const hitboxTop = baseRect.top + baseRect.height * 0.4362;
    const hitboxWidth = baseRect.width * 0.1881;
    const hitboxHeight = hitboxWidth * (356 / 347);

    mocoPlaceHitbox.style.display = 'block';
    mocoPlaceHitbox.style.position = 'fixed';
    mocoPlaceHitbox.style.left = `${hitboxLeft}px`;
    mocoPlaceHitbox.style.top = `${hitboxTop}px`;
    mocoPlaceHitbox.style.width = `${hitboxWidth}px`;
    mocoPlaceHitbox.style.height = `${hitboxHeight}px`;
  };

  const updateParallax = () => {
    syncHeroLogo();
    syncIntroSpacing();
    measureParallax();
    syncMocoPlaceHitbox();

    if (mocoLayers.length > 0) {
      const viewportHeight = Math.max(window.innerHeight, 1);
      const scrollStart = viewportHeight * 0.5;
      const scrollEnd = viewportHeight * 1.2;
      const staggerRatios = [0.24, 0, 0.36, 0.12];

      mocoLayers.forEach((layer, index) => {
        const delay = viewportHeight * (staggerRatios[index] || 0);
        const layerStart = scrollStart + delay;
        const layerRange = Math.max(scrollEnd - layerStart, 1);
        const progress = Math.min(Math.max((window.scrollY - layerStart) / layerRange, 0), 1);

        layer.style.setProperty('--scroll-progress', `${progress}`);
        layer.style.setProperty('--scroll-scale', `${1 - progress}`);
        layer.style.setProperty('--scroll-rotate', `${progress * 360}deg`);
        layer.style.setProperty('--scroll-opacity', `${1 - progress}`);
      });

      if (mocoPlaceHitbox) {
        const isClickable = window.scrollY < scrollStart;
        mocoPlaceHitbox.style.pointerEvents = isClickable ? 'auto' : 'none';
        mocoPlaceHitbox.tabIndex = isClickable ? 0 : -1;
        mocoPlaceHitbox.setAttribute('aria-hidden', String(!isClickable));
      }
    }

    const progress = Math.min(Math.max((window.scrollY - startScroll) / scrollable, 0), 1);
    const eased = progress * progress;
    parallaxTarget.style.setProperty('--parallax-y', `${-maxShift * eased}px`);
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    }
  };

  updateParallax();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('load', requestUpdate, { once: true });
});
