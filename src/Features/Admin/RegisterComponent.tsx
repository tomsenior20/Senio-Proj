import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function RegisterComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.from([containerRef.current, imageRef.current], { opacity: 0, x: 40 });
    gsap.to([containerRef.current, imageRef.current], {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.inOut',
    });
  }, []);
  return (
    <div className='registerContainer'>
      <div className='headerRegisterContainer' ref={containerRef}>
        <h1 className='mainHeaderRegister'>
          Process, Humans and tools meant to success together
        </h1>
        <h3 className='subHeaderRegister'>
          Boost Productivity, without needing expensive resources through
          utilising modern technology today.
        </h3>
      </div>

      <div className='registerButtonContainer'>
        <button className='registrationButton btn btn-outline'>
          Register Here
        </button>
      </div>

      <div className='techImageContainer'>
        <img
          className='techimage'
          src='/public/Tech.png'
          alt='tech image'
          ref={imageRef}
        />
      </div>
    </div>
  );
}
