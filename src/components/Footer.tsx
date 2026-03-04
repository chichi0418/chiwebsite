import { useState, useEffect, useRef } from 'react';
import './Footer.css';

const Footer = () => {
  const assetPath = '/chiwebsite/assets';
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 200);
        }
      },
      { threshold: 0.05 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  return (
    <footer className={`footer ${isVisible ? 'is-visible' : ''}`} ref={footerRef}>
      <div className="footer-content">
        <div className="footer-socials">
          <a href="https://github.com/chichi0418" target="_blank" rel="noopener noreferrer" className="social-link">
            <img src={`${assetPath}/github.jpg`} alt="GitHub" className="social-icon" />
            <span>GITHUB</span>
          </a>
          <a href="https://www.instagram.com/chichi_418/?hl=en" target="_blank" rel="noopener noreferrer" className="social-link">
            <img src={`${assetPath}/IG.webp`} alt="Instagram" className="social-icon" />
            <span>INSTAGRAM</span>
          </a>
          <a href="https://www.facebook.com/xu.bing.qi/about" target="_blank" rel="noopener noreferrer" className="social-link">
            <img src={`${assetPath}/FB.webp`} alt="Facebook" className="social-icon" />
            <span>FACEBOOK</span>
          </a>
        </div>

        <div className="footer-bottom">
          <div className="footer-tagline">
            <span>DESIGNED FOR THE DIGITAL SPACE</span>
          </div>
          <div className="footer-brand">
            <span>[ 2026 ] PING-CHI HSU</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
