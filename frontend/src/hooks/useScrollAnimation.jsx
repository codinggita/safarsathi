import { useEffect, useState, useRef } from 'react';

export const useScrollAnimation = (options = { threshold: 0.1, triggerOnce: true }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        if (options.triggerOnce) {
          observer.disconnect();
        }
      } else if (!entry.isIntersecting && !options.triggerOnce) {
        setHasAnimated(false);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [hasAnimated, options.triggerOnce, options.threshold]);

  return [ref, hasAnimated];
};

export const NumberCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [ref, inView] = useScrollAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};
