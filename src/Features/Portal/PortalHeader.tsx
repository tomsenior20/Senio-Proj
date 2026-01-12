import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
interface PortalHeaderProps {
  isAdmin: any;
  children: ReactNode;
}

function GenerateAdmin({ isAdmin }: { isAdmin: any }) {
  return (
    <div className='userLoggedinContainer'>
      <h1 className='loggedinUserText'>
        Welcome back: {isAdmin?.userloggedIn}
      </h1>
      <h3 className='loggedInSubText'>
        Always Stay Connected with modern tools, and features
      </h3>
    </div>
  );
}

export default function PortalHeader({ isAdmin, children }: PortalHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, { opacity: 0, y: 20 });
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.inOut',
    });
  }, []);
  return (
    <div className='loggedinLeftContainer' ref={containerRef}>
      {children}
      <GenerateAdmin isAdmin={isAdmin} />
    </div>
  );
}
