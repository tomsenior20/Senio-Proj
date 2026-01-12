interface SearchResult {
  name: string;
  email: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const RESULT_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
] as const;

function SearchResultColumns() {
  return (
    <thead>
      <tr>
        {RESULT_COLUMNS.map((columns) => (
          <th className='border border-black p-2! bg-gray-300! columnHeaderText'>
            {columns.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function SearchResults({ results }: SearchResultsProps) {
  return (
    <tbody>
      {results.map((item: any) => (
        <tr key={item.name} className='border border-black'>
          <td className='border border-black bg-gray-200! p-2! resultText'>
            {item.name}
          </td>
          <td className='border border-black bg-gray-200!  p-2! resultText'>
            {item.email}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function NoResults() {
  return (
    <thead className=''>
      <tr>
        <td className='noResultfoundText m-2!'>No Results Found</td>
      </tr>
    </thead>
  );
}

export default function SearchResultsModal({ results }: SearchResultsProps) {
  return (
    <table className='table resultTable'>
      {!Array.isArray(results) || results.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <SearchResultColumns />
          <SearchResults results={results} />
        </>
      )}
    </table>
  );
}
