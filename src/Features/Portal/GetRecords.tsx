import { useEffect, useState } from 'react';
import APIGet from '../../api/GetAPI';

interface ContactRecordProps {
  email: string;
  message: string;
  name: string;
  number: number;
  product: string;
  date_logged: string;
  acknowledged: number;
}

export default function GetContactRecords() {
  // Table Colimn Names
  const ColumnNames = [
    'Name',
    'Message',
    'Email',
    'Product',
    'Number',
    'Date Logged',
    'Ticket Actioned',
  ];

  const [contactRecords, setContactRecords] = useState<ContactRecordProps[]>(
    []
  );

  useEffect(() => {
    // Get Records
    async function GetRecords() {
      const data = await APIGet({
        APIEndPoint: 'getContactRecords',
        parameter: '',
        value: '',
      });
      setContactRecords(data);
    }
    GetRecords();
  }, []);

  return (
    <div className='overflow-x-auto text-black w-full'>
      <table className='table-lg w-full border border-black'>
        <thead className='bg-gray-200'>
          <tr>
            {ColumnNames.map((header) => (
              <th
                key={header}
                className='text-neutral text-lg border border-black p-2!'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-gray-100'>
          {contactRecords.map((item) => (
            <tr key={`${item.name}-${item.message}`}>
              <td className='text-neutral text-md  border border-black p-1!'>
                {item.name}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.message}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.email}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.product}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.number}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {new Date(item.date_logged).toLocaleString('en-gb')}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                <span className={item.acknowledged === 0 ? 'notAck' : 'ack'}>
                  {item.acknowledged === 0 ? 'False' : 'True'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
