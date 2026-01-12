import APIGet from '../../api/GetAPI';
import '../../styling/UserSearchModal.scss';
import { useState } from 'react';
import SearchResultsModal from './SearchResults';
import ErrorAlert from '../../components/common/error';

/* ===================== Types ===================== */

interface SearchResult {
  name: string;
  email: string;
}

interface UserSearchModalProps {
  showModal: boolean;
}

interface SearchContentProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: () => void;
  showError: boolean;
  showSearchResults: boolean;
  results: SearchResult[];
}

function SearchErrorContainer({ showError }: { showError: boolean }) {
  return (
    showError && <ErrorAlert show={showError} message='Invalid Search Result' />
  );
}

function UserForm() {
  return (
    <form method='dialog' className='ModalForm'>
      <button className='btn btn-primary modalCloseButton'>Close</button>
    </form>
  );
}

function GenerateSearchResults({
  showSearchResults,
  results,
}: {
  showSearchResults: boolean;
  results: SearchResult[];
}) {
  if (!showSearchResults) return null;

  return (
    <div className='searchresultContainer'>
      <SearchResultsModal results={results} />
    </div>
  );
}

function UserSearchModalContent({
  searchValue,
  setSearchValue,
  onSearch,
  showError,
  showSearchResults,
  results,
}: SearchContentProps) {
  return (
    <div className='ModalContent'>
      <SearchErrorContainer showError={showError} />

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
        />

        <button className='btn btn-primary searchUserButton' onClick={onSearch}>
          Search
        </button>
      </div>

      <GenerateSearchResults
        showSearchResults={showSearchResults}
        results={results}
      />
    </div>
  );
}

export default function UserSearchModal({ showModal }: UserSearchModalProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showError, setShowError] = useState(false);

  async function fetchSearchResults(name: string) {
    const data = await APIGet({
      APIEndPoint: 'getUserSearch',
      parameter: 'name',
      value: name,
    });

    setResults(data.results ?? []);
    setShowSearchResults(true);
  }

  function handleSearch() {
    setShowError(false);

    if (!searchValue.trim()) {
      setShowError(true);
      return;
    }

    fetchSearchResults(searchValue);
  }

  return (
    <dialog open={showModal} className='modal UserSearchModal'>
      <div className='modal-box UserSearchModalBox'>
        <UserSearchModalContent
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
          showError={showError}
          showSearchResults={showSearchResults}
          results={results}
        />

        <UserForm />
      </div>
    </dialog>
  );
}
