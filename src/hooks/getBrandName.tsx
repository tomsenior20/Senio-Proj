import { useEffect, useRef, useState } from 'react';
import APIGet from '../api/GetAPI'; // make sure path is correct
import gsap from 'gsap';

export default function GetBrandName() {
  const [brandName, setBrandName] = useState<string>('');
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBrandName() {
      const data = await APIGet({
        APIEndPoint: 'getAppSettings',
        parameter: 'name',
        value: 'BrandName',
      });

      if (data && data.length > 0) {
        setBrandName(data[0].value);
      } else {
        return;
      }
    }

    fetchBrandName();

    // Animations using GSAP for the Header Container
    if (!container.current) return;
    gsap.set(container.current, { opacity: 0, y: 30 });
    gsap.to(container.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.inOut',
    });
  }, []);

  return (
    <header>
      <div className='headerContainer' ref={container}>
        <h1 className='headerTitle'>{brandName}</h1>
        <p className='subHeaderTitle'>
          Where the door to centralised innovation occurs, exploring better ways
          to control your personal development better
        </p>
        <button className='btn btn-primary mt-6! px-6! py-3! GetStartedbutton'>
          Get Started
        </button>
      </div>
    </header>
  );
}
