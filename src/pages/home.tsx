import '../styling/home.scss';
import BrandNameContainer from '../hooks/getBrandName';
import Footer from '../components/layout/footer';
import RemoveDirect from '../components/common/removeDirect';
import { useEffect } from 'react';
import RegisterView from '../Features/Home/RegisterView';
import HomeFirstSection from '../Features/Home/HomeFirstSection';

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
      <HomeFirstSection />
      <Footer />
    </>
  );
}
