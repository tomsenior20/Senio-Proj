import "../styling/home.scss";
import BrandNameContainer from '../hooks/getBrandName.tsx';
import Footer from "../components/footer.tsx";
import RemoveDirect from '../components/removeDirect.tsx';
import { useEffect } from "react";


async function RegisterView(){
    const isLocalhost = window.location.hostname === "localhost";
    const baseUrl =  isLocalhost ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}` : `${import.meta.env.VITE_LAN_API_URL}:${import.meta.env.VITE_LAN_API_PORT}` ;
    
    const res = await fetch(`${baseUrl}/api/registerView`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            statName : "Views",
            description: "Count of Website Views",
            ticket_created: new Date().toISOString().slice(0, 19).replace("T", " ")
            })
        });
            
        const data = await res.json();
        console.log(data);
}
export default function Home() {
    // Register View Per Mount
    useEffect(() => {
        RegisterView().catch(console.error);
    })
    return(
        <>
        <RemoveDirect />
        <BrandNameContainer />
        <section className="firstSection">
            <div className='offeringContainer'>
                <div className="offeringTextContainer">
                    <h1 className="offeringHeader">Simplifying everyday life with Senio’s scalable, all-in-one solutions.</h1>
                    <h3 className="offeringSubHeader">Discover More About Us</h3>
                    <button className="btn btn-active btn-primary w-full discoverMoreButton">
                        Discover More
                    </button>
                </div>
                <div className="offeringImageContainer">
                    <img className="offeringImage" src="/vite.svg" alt="welcomingImage" />                   
                </div>
            </div>
        </section>
        <Footer />
        </>
    )
    
}