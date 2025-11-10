import "../styling/home.css";
import BrandNameContainer from '../hooks/getBrandName.tsx';
import Footer from "../components/footer.tsx";

export default function Home() {
    return(
        <>
        <header>
            <BrandNameContainer />
        </header>
        <section className="firstSection">
            <div className='offeringContainer'>
                <div className="offeringTextContainer">
                    <h1 className="offeringHeader">Simplifying everyday life with Senio’s scalable, all-in-one solutions.</h1>
                    <h3 className="offeringSubHeader">Disover More About Us</h3>
                    <button className="discoverMoreButton">Discover More
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-2 discoverArrow">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg> 
                    </button>
                </div>
                <div className="offeringImageContainer">
                    <img className="offeringImage" src="public/vite.svg" alt="welcomingImage" />                   
                </div>
            </div>
        </section>
        <Footer />
        </>
    )
    
}