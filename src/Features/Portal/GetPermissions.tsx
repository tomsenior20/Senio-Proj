import GetAPI from '../../api/api';
import { useEffect, useState } from 'react';

interface LoggedIn {
  admin: boolean;
  userloggedIn: string;
}

export default function GetPermissions() {
  const [LoggedIn, setLoggedInObj] = useState<LoggedIn | null>(null);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        const nameFromStorage = localStorage.getItem('logged_in_name');
        if (!nameFromStorage) {
          console.log('No logged in user');
          return;
        }
        // Name for API Call
        const name: string = nameFromStorage;
        const data = await GetAPI<any[], { name: string }>({
          APIEndPoint: 'CheckSignonTableByName',
          body: { name },
        });

        if (data) {
          for (var item of data) {
            setLoggedInObj({
              admin: item.admin === 1,
              userloggedIn: item.name,
            });
          }
        } else {
          console.log('No Valid Data Present for User');
        }
      } catch (error) {
        console.log('Error fetching perm by name');
      }
    }
    fetchPermissions();
  }, []);
  return LoggedIn;
}
