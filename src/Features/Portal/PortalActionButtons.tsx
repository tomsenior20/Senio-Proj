import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import '../../styling/sidebar.scss';

interface AdminActionProp {
  isAdmin: boolean;
  showAdminContainer: boolean;
}

function UserSearch_Click() {
  alert('Users search');
}

function AccessManagement_Click() {
  alert('Access Management Clicked');
}

export default function AdminAction({
  isAdmin,
  showAdminContainer,
}: AdminActionProp) {
  const [AdminMenu, setAdminMenu] = useState<boolean>();

  useEffect(() => {
    setAdminMenu(isAdmin);
  }, []);

  return (
    <>
      {AdminMenu && (
        <div
          className={`adminAccessContainer ${
            showAdminContainer ? '' : 'closed'
          }`}
        >
          <ul>
            <li>
              <button
                className='btn btn-active btn-primary w-full'
                onClick={UserSearch_Click}
              >
                <FaSearch className='adminIcon' />
                <span className='buttonText'>User Search</span>
              </button>
            </li>
            <li>
              <button
                className='btn btn-active btn-primary w-full'
                onClick={AccessManagement_Click}
              >
                <FaCog className='adminIcon' />
                <span className='buttonText'>Access Management</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      ;
    </>
  );
}
