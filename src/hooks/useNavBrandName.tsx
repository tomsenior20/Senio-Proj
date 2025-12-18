import { useEffect, useState } from 'react';
import APIGet from '../components/api/GetAPI';

export default function UseNavBrandName() {
  const [brandName, setBrandName] = useState('');

  // Fetches us the brand name
  useEffect(() => {
    async function FetchBrandName() {
      const data = await APIGet({
        APIEndPoint: 'getAppSettings',
        parameter: 'name',
        value: 'NavBrandName',
      });

      if (data) {
        setBrandName(data[0].value);
      }
    }

    FetchBrandName();
  }, []);
  return (
    <div className='BrandContainer'>
      <h1 className='brandName'>{brandName}</h1>
    </div>
  );
}
