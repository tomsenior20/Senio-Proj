import APIGet from '../../api/GetAPI';
import { useState, useEffect } from 'react';

interface AuditProps {
  id: number;
  name: string;
  email: string;
  acknowledged_by: string;
}

function AuditRow({ record }: { record: AuditProps }) {
  return (
    <tr>
      <td className='border border-black bg-gray-100 auditRecordText'>
        {record.id}
      </td>
      <td className='border border-black bg-gray-100 auditRecordText'>
        {record.name}
      </td>
      <td className='border border-black bg-gray-100 auditRecordText'>
        {record.email}
      </td>
      <td className='border border-black bg-gray-100 auditRecordText'>
        {record.acknowledged_by}
      </td>
    </tr>
  );
}

export default function AuditLogRecord() {
  const [auditRecords, setAuditRecords] = useState<AuditProps[]>([]);
  useEffect(() => {
    async function GetAuditLog() {
      const data = await APIGet({
        APIEndPoint: 'getAuditLog',
        parameter: '',
        value: '',
      });
      // Assigns the data results returned
      setAuditRecords(data.results);
    }
    // Calls async function
    GetAuditLog();
  }, []);
  return (
    <div className='overflow-x-auto text-black w-full'>
      <table className='table'>
        <thead>
          <tr>
            <th className='border border-black bg-gray-300 auditColumnHeader'>
              id
            </th>
            <th className='border border-black bg-gray-300 auditColumnHeader'>
              Name
            </th>
            <th className='border border-black bg-gray-300 auditColumnHeader'>
              Email
            </th>
            <th className='border border-black bg-gray-300 auditColumnHeader'>
              Acknowledged By
            </th>
          </tr>
        </thead>
        <tbody>
          {auditRecords.map((record) => (
            <AuditRow key={record.id} record={record} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
