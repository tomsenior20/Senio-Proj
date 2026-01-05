import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import '../../styling/sidebar.scss';
import UserSearchModal from './UserSearchModal';

interface AdminActionProp {
  isAdmin: boolean;
  showAdminContainer: boolean;
  onToggleModal: () => void;
}

export default function AdminAction({
  isAdmin,
  showAdminContainer,
  onToggleModal,
}: AdminActionProp) {
  const [AdminMenu, setAdminMenu] = useState<boolean>();

  function AccessManagement_Click() {
    alert('Access Management Clicked');
  }

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
            <li className=''>
              <button
                className='btn btn-active btn-primary w-full'
                onClick={onToggleModal}
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
    </>
  );
}
