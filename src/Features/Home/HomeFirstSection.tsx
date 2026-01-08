import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function HomeFirstSection() {
  const DiscoverText: string = 'Discover More';
  const DiscoverMoreText: string = 'Discover More About Us';
  const ProductOffering: string =
    'Simplifying everyday life with Senio’s scalable, all-in-one solutions.';
  const offeringImageSource = '/vite.svg';
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateY: 360,
      duration: 6,
      ease: 'none',
      repeat: -1,
    });
  });

  // HTML Rendered
  return (
    <section className='firstSection'>
      <div className='offeringContainer'>
        <div className='offeringTextContainer'>
          <h1 className='offeringHeader'>{ProductOffering}</h1>
          <h3 className='offeringSubHeader'>{DiscoverMoreText}</h3>
          <button className='btn btn-active btn-primary w-full discoverMoreButton'>
            {DiscoverText}
          </button>
        </div>
        <div className='offeringImageContainer'>
          <img
            className='offeringImage'
            src={offeringImageSource}
            alt='welcomingImage'
            ref={imageRef}
          />
        </div>
      </div>
    </section>
  );
}
