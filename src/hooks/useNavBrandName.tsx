import { useEffect, useState } from "react"

export default function UseNavBrandName(){
        const [brandName, setBrandName] = useState("");

        const isLocalhost = window.location.hostname === "localhost";
        const baseUrl =  isLocalhost ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}` : `${import.meta.env.VITE_LAN_API_URL}:${import.meta.env.VITE_LAN_API_PORT}` ;
        
        // Fetches us the brand name
        useEffect(() => {
            fetch(`${baseUrl}/api/getAppSettings?name=NavBrandName`)
            .then(res => res.json())
            .then(data => {
                if(data){
                    setBrandName(data[0].value);
                }
            })
            .catch(err => console.error(err));
        }, []);
    return(
        <div className="BrandContainer">
            <h1 className="brandName">{brandName}</h1>
        </div>
    )
}