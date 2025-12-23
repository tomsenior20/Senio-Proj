import '../styling/home.scss';
import BrandNameContainer from '../hooks/getBrandName';
import Footer from '../components/layout/footer';
import RemoveDirect from '../components/common/removeDirect';
import { useEffect } from 'react';
import RegisterView from '../features/Home/RegisterView';
import HomeFirstSection from '../features/Home/HomeFirstSection';

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
