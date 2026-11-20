import { useEffect, useRef, useSyncExternalStore } from 'react';

let queries;
const subscribers = new Set();

function getQueries() {
  queries ??= [
    window.matchMedia('(any-pointer: coarse), (hover: none)'),
    window.matchMedia('(max-width: 767px)'),
    window.matchMedia('(prefers-reduced-motion: reduce)'),
  ];
  return queries;
}

function snapshot() {
  if (typeof window === 'undefined') return 7;
  const [touch, small, reduced] = getQueries();
  return ((touch.matches || navigator.maxTouchPoints > 0) ? 1 : 0)
    | (small.matches ? 2 : 0)
    | (reduced.matches ? 4 : 0);
}

function notify() {
  subscribers.forEach((callback) => callback());
}

function subscribe(callback) {
  if (subscribers.size === 0) {
    getQueries().forEach((query) => query.addEventListener('change', notify));
  }
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0) {
      getQueries().forEach((query) => query.removeEventListener('change', notify));
    }
  };
}

export function useMotionPolicy() {
  const flags = useSyncExternalStore(subscribe, snapshot, () => 7);
  return {
    isTouch: Boolean(flags & 1),
    reducedMotion: Boolean(flags & 4),
    canHover: !(flags & 1),
    simpleEffects: flags !== 0,
  };
}

// One pair of observers for all cards; no scroll or pointer-move listeners.
export function usePortfolioCardMotion(gridRef, ready, reducedMotion, run) {
  const revealed = useRef(new Set());

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !ready) return;
    const cards = [...grid.children];
    const indexes = new Map(cards.map((card, index) => [card, index]));

    function reveal(card) {
      const index = indexes.get(card);
      if (revealed.current.has(index)) return;
      revealed.current.add(index);
      card.dataset.reveal = reducedMotion || card.classList.contains('TutorialTarget') ? 'done' : 'revealing';
    }

    function finishReveal(event) {
      if (event.animationName === 'portfolio-card-reveal') {
        event.target.dataset.reveal = 'done';
      }
    }

    function setVisibility(card, visible) {
      card.dataset.inView = String(visible);
      card.querySelectorAll('.ShineBorder svg').forEach((svg) => {
        if (visible && !document.hidden) svg.unpauseAnimations?.();
        else svg.pauseAnimations?.();
      });
    }

    function updatePageVisibility() {
      document.documentElement.toggleAttribute('data-page-hidden', document.hidden);
      cards.forEach((card) => setVisibility(card, card.dataset.inView === 'true'));
    }

    cards.forEach((card, index) => {
      card.dataset.reveal = revealed.current.has(index) || reducedMotion ? 'done' : 'pending';
      if (reducedMotion) revealed.current.add(index);
    });

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => {
        card.dataset.reveal = 'done';
        revealed.current.add(indexes.get(card));
        setVisibility(card, true);
      });
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        reveal(target);
        revealObserver.unobserve(target);
      });
    }, { threshold: 0.08 });

    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => setVisibility(target, isIntersecting));
    }, { rootMargin: '80px 0px' });

    cards.forEach((card, index) => {
      if (!revealed.current.has(index)) revealObserver.observe(card);
      visibilityObserver.observe(card);
    });
    grid.addEventListener('animationend', finishReveal);
    document.addEventListener('visibilitychange', updatePageVisibility);
    updatePageVisibility();

    return () => {
      revealObserver.disconnect();
      visibilityObserver.disconnect();
      grid.removeEventListener('animationend', finishReveal);
      document.removeEventListener('visibilitychange', updatePageVisibility);
      document.documentElement.removeAttribute('data-page-hidden');
    };
  }, [gridRef, ready, reducedMotion, run]);
}
