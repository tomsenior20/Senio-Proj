export default function HomeFirstSection() {
  const DiscoverText: string = 'Discover More';
  const DiscoverMoreText: string = 'Discover More About Us';
  const ProductOffering: string =
    'Simplifying everyday life with Senio’s scalable, all-in-one solutions.';
  const offeringImageSource = '/vite.svg';
  // HTML Rendered
  return (
    <section className='firstSection'>
      <div className='offeringContainer'>
        <div className='offeringTextContainer'>
          <h1 className='offeringHeader'>{ProductOffering}</h1>
          <h3 className='offeringSubHeader'>{DiscoverMoreText}</h3>
          <button className='btn btn-active btn-primary w-full discoverMoreButton'>
            {DiscoverText}
          </button>
        </div>
        <div className='offeringImageContainer'>
          <img
            className='offeringImage'
            src={offeringImageSource}
            alt='welcomingImage'
          />
        </div>
      </div>
    </section>
  );
}
