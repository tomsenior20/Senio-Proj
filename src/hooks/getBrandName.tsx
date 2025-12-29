import { useEffect, useState } from 'react';
import APIGet from '../api/GetAPI'; // make sure path is correct

export default function GetBrandName() {
  const [brandName, setBrandName] = useState<string>('');

  useEffect(() => {
    async function fetchBrandName() {
      const data = await APIGet({
        APIEndPoint: 'getAppSettings',
        parameter: 'name',
        value: 'BrandName',
      });

      if (data && data.length > 0) {
        setBrandName(data[0].value);
      } else {
        return;
      }
    }

    fetchBrandName();
  }, []);

  return (
    <header>
      <div className='headerContainer'>
        <h1 className='headerTitle'>{brandName}</h1>
        <p className='subHeaderTitle'>
          Where the door to centralised innovation occurs, exploring better ways
          to control your personal development better
        </p>
        <button className='btn btn-primary mt-6! px-6! py-3! GetStartedbutton'>
          Get Started
        </button>
      </div>
    </header>
  );
}
