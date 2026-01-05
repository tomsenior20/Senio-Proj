import '../../styling/UserSearchModal.scss';
import { useState } from 'react';

export default function UserSearchModal({ showModal }: { showModal: boolean }) {
  const [searchValue, setSearchValue] = useState<string>('');
  function SearchUser() {
    if (!searchValue) {
      alert('Invalid Search Value');
    }
  }

  return (
    <dialog open={showModal} className='modal UserSearchModal'>
      <div className='modal-box UserSearchModalBox'>
        <div className='ModalContent'>
          <h1 className='ModalHeader'>User Search:</h1>
          <div className='searchUserContainer'>
            <input
              type='text'
              placeholder='Enter User'
              aria-label='Name Search'
              className='user-input'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
            <button
              className='btn btn-primary searchUserButton'
              onClick={SearchUser}
            >
              Search
            </button>
          </div>
        </div>
        <form method='dialog' className='ModalForm'>
          <button className='btn btn-primary modalCloseButton'>Close</button>
        </form>
      </div>
    </dialog>
  );
}
