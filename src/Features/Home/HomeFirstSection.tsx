export default function HomeFirstSection() {
  return (
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
          <img className='offeringImage' src='/vite.svg' alt='welcomingImage' />
        </div>
      </div>
    </section>
  );
}
