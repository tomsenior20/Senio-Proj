import { useEffect, useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import '../../styling/sidebar.scss';
import gsap from 'gsap';
import { HiCog, HiOutlineSearch } from 'react-icons/hi';

interface AdminActionProp {
  isAdmin: boolean;
  showAdminContainer: boolean;
  sidebaropen: boolean;
  onToggleModal: () => void;
}

export default function AdminAction({
  isAdmin,
  showAdminContainer,
  sidebaropen,
  onToggleModal,
}: AdminActionProp) {
  const [AdminMenu, setAdminMenu] = useState<boolean>();
  const sidebarSubRef = useRef<HTMLDivElement>(null);

  function AccessManagement_Click() {
    alert('Access Management Clicked');
  }

  useEffect(() => {
    setAdminMenu(isAdmin);

    gsap.from(sidebarSubRef.current, {
      opacity: 0,
    });
    gsap.to(sidebarSubRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power3.inOut',
    });
  }, [sidebaropen]);

  return (
    <>
      {AdminMenu && (
        <div
          className={`adminAccessContainer ${
            showAdminContainer ? '' : 'closed'
          }`}
          ref={sidebarSubRef}
        >
          <ul>
            <li className=''>
              <button
                className='btn btn-active btn-primary w-full'
                onClick={onToggleModal}
              >
                <FaSearch className='adminIcon' />
                <span className='buttonText'>User Search</span>
                <HiOutlineSearch />
              </button>
            </li>
            <li>
              <button
                className='btn btn-active btn-primary w-full'
                onClick={AccessManagement_Click}
              >
                <FaCog className='adminIcon' />
                <span className='buttonText'>Access Management</span>
                <HiCog />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
