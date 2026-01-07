'use client';
import { useEffect, useState } from 'react';
import APIGet from '../../api/GetAPI';

interface ContactLinksProps {
  name: string;
  value: string;
}
export default function GenerateContactHero() {
  const [contactLinks, setContactLinks] = useState<ContactLinksProps[]>([]);

  // Used to Add Space at the end of contact methods
  function replaceContactAlias(name: string) {
    return name.replace('Contact', '');
  }

  // Async function to get contact information from db
  useEffect(() => {
    async function GetContactLinks() {
      const data = await APIGet({
        APIEndPoint: 'getContactDetails',
        parameter: 'name',
        value: 'Contact',
      });

      console.log('APIGet returned:', data);
      console.log('Is array?', Array.isArray(data));

      setContactLinks(data);
    }

    GetContactLinks();
  }, []);

  return (
    <div className='helpContainer'>
      <div className='helpContentContainer'>
        <h1 className='helpHeader'>Need Help?</h1>
        <p className='helpText'>
          We're here to help! Fill out the form beside to reach us. Our customer
          care team will be available to answer any futher queries and will
          alternatively respond to the contact query. Please allow 24-48 hours
          during operational times for the product.
        </p>
      </div>
      <div className='contactLinkContainer'>
        <table className='table w-full tablecontainer p-2'>
          <tbody>
            {contactLinks.map((contactLink) => (
              <tr className='contactLinksList' key={contactLink.name}>
                <td className='flex w-full'>
                  <p className='contactLinksMethod' aria-label='contactLink'>
                    {replaceContactAlias(contactLink.name)}
                  </p>
                  <p className='contactLinks' aria-label='contact value'>
                    {contactLink.value}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
