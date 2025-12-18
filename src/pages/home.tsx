import '../styling/home.scss';
import BrandNameContainer from '../hooks/getBrandName';
import Footer from '../components/footer';
import RemoveDirect from '../components/removeDirect';
import { useEffect } from 'react';
import GetAPI from '../components/api/api';

async function RegisterView() {
  const data = GetAPI({
    APIEndPoint: 'registerView',
    body: {
      statName: 'Views',
      description: 'Count of Website Views',
      ticket_created: new Date().toISOString().slice(0, 19).replace('T', ' '),
    },
  });
  console.log(data);
}

// Home Function
export default function Home() {
  // Register View Per Mount
  useEffect(() => {
    RegisterView().catch(console.error);
  });
  return (
    <>
      <RemoveDirect />
      <BrandNameContainer />
      <section className='firstSection'>
        <div className='offeringContainer'>
          <div className='offeringTextContainer'>
            <h1 className='offeringHeader'>
              Simplifying everyday life with Senio’s scalable, all-in-one
              solutions.
            </h1>
            <h3 className='offeringSubHeader'>Discover More About Us</h3>
            <button className='btn btn-active btn-primary w-full discoverMoreButton'>
              Discover More
            </button>
          </div>
          <div className='offeringImageContainer'>
            <img
              className='offeringImage'
              src='/vite.svg'
              alt='welcomingImage'
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
