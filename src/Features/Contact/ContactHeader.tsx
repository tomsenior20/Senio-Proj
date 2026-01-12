import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Header() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.inOut',
      }
    );
  }, []);
  const PageHeaderText: string = 'Contact';
  const PageSubText: string =
    'Please fill out the form below, well contact you as soon as possible';
  return (
    <header className='contactHeaderContainer'>
      <div ref={containerRef} className='d-flex'>
        <h1 className='contactHeader text-center'>{PageHeaderText}</h1>
        <h3 className='contactSubHeader'>{PageSubText}</h3>
      </div>
    </header>
  );
}

export default function ContactHeader() {
  return (
    <>
      <Header />
    </>
  );
}
