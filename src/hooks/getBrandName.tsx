import { useEffect, useState } from "react"

export default function GetBrandName(){
        const isLocalhost = window.location.hostname === "localhost";
        const baseUrl =  isLocalhost ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}` : `${import.meta.env.VITE_LAN_API_URL}:${import.meta.env.VITE_LAN_API_PORT}` ;

        const [brandName, setBrandName] = useState("");
        useEffect(() => {
            fetch(`${baseUrl}/api/getAppSettings?name=BrandName`)
            .then(res => res.json())
            .then(data => {
                if(data){
                    setBrandName(data[0].value);
                }
            })
            .catch(err => console.error(err));
        }, []);
    return(
        <>
            <div className="headerContainer">
                <h1 className="headerTitle">{brandName}</h1>
                <p className="subHeaderTitle">Where the door to centeralised innovation occurs, exploring better ways to control your personal development better</p>
            </div>
        </>
    )
}