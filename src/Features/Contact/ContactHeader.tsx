import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContactHeader() {
  const PageHeaderText: string = 'Contact';
  const PageSubText: string =
    'Please fill out the form below, well contact you as soon as possible';

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, { opacity: 0, y: 30 });
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'power3.inOut',
    });
  }, []);

  return (
    <header className='contactHeaderContainer'>
      <div ref={containerRef}>
        <h1 className='contactHeader'>{PageHeaderText}</h1>
        <h3 className='contactSubHeader'>{PageSubText}</h3>
      </div>
    </header>
  );
}
