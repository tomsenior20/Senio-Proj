import { useEffect, useState } from 'react';
import APIGet from '../../api/GetAPI';
import GetAPI from '../../api/api';
import { HiCheck } from 'react-icons/hi';

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
  function actionTicket(record: ContactRecordProps) {
    if (!record) {
      return;
    }

    async function AcknowledgeTicket() {
      await GetAPI({
        APIEndPoint: 'acknowledgeDocument',
        body: {
          name: record.name,
          email: record.email,
          acknowledgedby: localStorage.getItem('logged_in_name'),
        },
      });

      setContactRecords((prev) =>
        prev.map((item) =>
          item.name === record.name && item.email === record.email
            ? { ...item, acknowledged: 1 }
            : item
        )
      );
    }

    AcknowledgeTicket();
  }

  // Table Colimn Names
  const ColumnNames = [
    'Name',
    'Message',
    'Email',
    'Product',
    'Number',
    'Date Logged',
    'Actioned',
    'Action',
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
                className='text-neutral text-lg border border-black p-2! contactColText'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-gray-100'>
          {contactRecords.length > 0 ? (
            contactRecords
              .filter(
                (item) =>
                  item !== null &&
                  item.name !== '' &&
                  item.message !== '' &&
                  item.email !== '' &&
                  item.product !== '' &&
                  item.number !== null
              )
              .map((item) => (
                <tr key={`${item.name}-${item.message}`}>
                  <td className='text-neutral text-md  border border-black p-1! recordText'>
                    {item.name}
                  </td>
                  <td className='text-neutral text-md border border-black p-1! recordText'>
                    {item.message}
                  </td>
                  <td className='text-neutral text-md border border-black p-1! recordText'>
                    {item.email}
                  </td>
                  <td className='text-neutral text-md border border-black p-1! recordText'>
                    {item.product}
                  </td>
                  <td className='text-neutral text-md border border-black p-1! recordText'>
                    {item.number}
                  </td>
                  <td className='text-neutral text-md border border-black p-1! recordText'>
                    {new Date(item.date_logged).toLocaleString('en-gb')}
                  </td>
                  <td className='text-neutral text-md border border-black p-1! recordText'>
                    <span
                      className={item.acknowledged === 0 ? 'notAck' : 'ack'}
                    ></span>
                  </td>
                  <td className='text-neutral text-md border border-black p-3!'>
                    {item.acknowledged === 0 ? (
                      <button
                        className='btn btn-success w-full'
                        type='submit'
                        onClick={() => {
                          actionTicket(item);
                        }}
                      >
                        <span className='actionButton'>Action</span>
                        <HiCheck size={20} className='checkIcon' />
                      </button>
                    ) : (
                      <> No Action Required</>
                    )}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={ColumnNames.length} className='text-center p-4'>
                No Records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
