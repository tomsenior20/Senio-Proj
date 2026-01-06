interface SearchResultsProps {
  results: any[];
}

export default function SearchResultsModal({ results }: SearchResultsProps) {
  return (
    <table className='table resultTable'>
      {!Array.isArray(results) || results.length === 0 ? (
        <thead>
          <tr>
            <th className='columnHeaderText'>No Results Found</th>
          </tr>
        </thead>
      ) : (
        <>
          <thead>
            <tr className='border border-black'>
              <th className='border border-black p-2! bg-gray-300! columnHeaderText'>
                Name
              </th>
              <th className='border border-black p-2! bg-gray-300! columnHeaderText'>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((item: any, index: number) => (
              <tr key={index} className='border border-black'>
                <td className='border border-black bg-gray-200! p-2! resultText'>
                  {item.name}
                </td>
                <td className='border border-black bg-gray-200!  p-2! resultText'>
                  {item.email}
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </table>
  );
}
