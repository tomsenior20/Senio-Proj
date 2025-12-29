import '../../styling/sidebar.scss';
import AdminAction from '../../features/Portal/PortalActionButtons';
import { useState } from 'react';

interface UserLevel {
  levelOfUser: boolean;
}

export default function Sidebar({ levelOfUser }: UserLevel) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  // Function for menu click
  function MenuClick() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div
      className={`sideBarContainer ${sidebarOpen ? '' : 'closed'}`}
      id='sideBarContainer'
      aria-label='sidebar'
    >
      <div
        className={`p-2! m-1! flex ${
          sidebarOpen ? 'justify-end' : 'justify-center'
        }`}
      >
        <button
          className='btn btn-sm btn-square bg-transparent'
          onClick={MenuClick}
          aria-label='Mobile SideBar Button'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='50'
            height='50'
            viewBox='0 0 30 30'
          >
            <path d='M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z'></path>
          </svg>
        </button>
      </div>
      <div className={`levelContainer  ${sidebarOpen ? '' : 'closed'}`}>
        <h1 className='leveluserText'>Level of user: </h1>
        <h2 className='levelText'>{levelOfUser ? 'Admin' : 'Non Admin'}</h2>
      </div>
      {levelOfUser && (
        <AdminAction isAdmin={levelOfUser} showAdminContainer={sidebarOpen} />
      )}
    </div>
  );
}
