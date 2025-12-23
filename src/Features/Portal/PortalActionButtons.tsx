import { FaSearch } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';

export default function AdminAction() {
  return (
    <div className='adminAccessContainer'>
      <ul>
        <li>
          <button className='btn btn-active btn-primary w-full'>
            <FaSearch className='adminIcon' />
            <span className='buttonText'>User Search</span>
          </button>
        </li>
        <li>
          <button className='btn btn-active btn-primary w-full'>
            <FaCog className='adminIcon' />
            <span className='buttonText'>Access Management</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
