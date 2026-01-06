import APIGet from '../../api/GetAPI';
import '../../styling/UserSearchModal.scss';
import { useState } from 'react';
import SearchResultsModal from './SearchResults';

export default function UserSearchModal({ showModal }: { showModal: boolean }) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [showSearchResults, setSearchResults] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]);

  function SearchUser() {
    if (!searchValue) {
      alert('Invalid Search Value');
    }
    SearchResults(searchValue);
  }

  function SearchResults(name: string) {
    async function SearchUser() {
      const data = await APIGet({
        APIEndPoint: 'getUserSearch',
        parameter: 'name',
        value: name,
      });
      // Sets Results to object
      setResults(data.results);
    }
    // Call Get User Search
    setSearchResults(true);
    SearchUser();
  }

  return (
    <dialog open={showModal} className='modal UserSearchModal'>
      <div className='modal-box UserSearchModalBox'>
        <div className='ModalContent'>
          <h1 className='ModalHeader'>User Search:</h1>
          <h3 className='modalSubText'>Use below to see if a user exists</h3>
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
          <div className='searchresultContainer'>
            {showSearchResults && <SearchResultsModal results={results} />}
          </div>
        </div>
        <form method='dialog' className='ModalForm'>
          <button className='btn btn-primary modalCloseButton'>Close</button>
        </form>
      </div>
    </dialog>
  );
}
