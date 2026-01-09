import '../../styling/sidebar.scss';
import AdminAction from '../../features/Portal/PortalActionButtons';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HiMenu } from 'react-icons/hi';

interface UserLevel {
  levelOfUser: boolean;
  onToggleModal: () => void;
}

export default function Sidebar({ levelOfUser, onToggleModal }: UserLevel) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarSubRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  // Function for menu click
  function MenuClick() {
    setSidebarOpen(!sidebarOpen);
  }

  useEffect(() => {
    // If null return out of this functuon
    if (!containerRef.current || !sidebarSubRef.current) return;
    // Width of Menu section
    gsap.to(containerRef.current, {
      width: sidebarOpen ? '20%' : '5%',
      duration: 1,
      ease: 'power3.inOut',
    });
    gsap.from(sidebarSubRef.current, {
      opacity: 0,
    });

    // Menu Level Text
    gsap.to(sidebarSubRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power3.inOut',
    });
    gsap.from(mobileButtonRef.current, {
      x: sidebarOpen ? -40 : 40,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform',
    });
  }, [sidebarOpen]);

  return (
    <div
      className={`sideBarContainer ${sidebarOpen ? '' : 'closed'}`}
      id='sideBarContainer'
      aria-label='sidebar'
      ref={containerRef}
    >
      <div className={`p-2! m-1! flex justify-end menubuttonContainer`}>
        <button
          className='btn btn-sm btn-square bg-white border-1 border-black'
          onClick={MenuClick}
          aria-label='Mobile SideBar Button'
          ref={mobileButtonRef}
        >
          <HiMenu size={30} color='black' className='sidebarMenuButton' />
        </button>
      </div>
      <div
        className={`levelContainer  ${sidebarOpen ? '' : 'closed'}`}
        ref={sidebarSubRef}
      >
        <h1 className='leveluserText'>Level of user: </h1>
        <h2 className='levelText'>{levelOfUser ? 'Admin' : 'Non Admin'}</h2>
      </div>
      {levelOfUser && (
        <AdminAction
          isAdmin={levelOfUser}
          showAdminContainer={sidebarOpen}
          sidebaropen={sidebarOpen}
          onToggleModal={onToggleModal}
        />
      )}
    </div>
  );
}
