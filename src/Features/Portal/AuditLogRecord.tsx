import APIGet from '../../api/GetAPI';
import { useState, useEffect } from 'react';

interface AuditProps {
  id: number;
  name: string;
  email: string;
  acknowledged_by: string;
}

const AUDIT_COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'acknowledged_by', label: 'Acknowledged By' },
] as const;

function AuditColumns() {
  return (
    <thead>
      <tr>
        {AUDIT_COLUMNS.map((col) => (
          <th
            key={col.key}
            className='border border-black bg-gray-300 auditColumnHeader'
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
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
        <AuditColumns />
        <tbody>
          {auditRecords.map((record) => (
            <AuditRow key={record.id} record={record} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
