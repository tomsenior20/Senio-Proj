import { useEffect } from 'react';

export default function RemoveDirect() {
  useEffect(() => {
    const path = window.location.pathname;

    if (!path.includes('portal')) {
      localStorage.removeItem('logged_in_name');
    }
  }, []);

  return null; // component does not render anything
}
