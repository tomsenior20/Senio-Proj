import APIGet from '../../api/GetAPI';
import { useState, useEffect } from 'react';

interface AuditProps {
  name: string;
  email: string;
  acknowledged_by: string;
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
        {auditRecords.map((item: any, index: number) => (
          <tr>
            <td className='border border-black bg-gray-100 auditRecordText'>
              {item.id}
            </td>
            <td className='border border-black bg-gray-100 auditRecordText'>
              {item.name}
            </td>
            <td className='border border-black bg-gray-100 auditRecordText'>
              {item.email}
            </td>
            <td className='border border-black bg-gray-100 auditRecordText'>
              {item.acknowledged_by}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
