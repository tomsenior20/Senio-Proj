import { useEffect, useState } from "react";
import "../styling/portal.scss"
import Footer from '../components/footer';
import { Navigate } from "react-router-dom";
import SideBar from "../components/sidebar";
import DashboardStat from "../components/dahsboard";

interface LoggedIn{
    admin : boolean,
    userloggedIn : string;
}

function GetCurrentYear(){
    const date = new Date();
    const dateString = date.toDateString();
    return(
        <div className="currentDateContainer">
            <p className="curDateText">{dateString}</p>
        </div>
    )
}

function GetPermissions(){
    const [LoggedIn, setLoggedInObj] = useState< LoggedIn| null >(null);

    useEffect(() => {
        async function fetchPermissions() {
            const isLocalhost = window.location.hostname === "localhost";
            const baseUrl =  isLocalhost ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}` : `${import.meta.env.VITE_LAN_API_URL}:${import.meta.env.VITE_LAN_API_PORT}` ;
            try{
                const name = localStorage.getItem("logged_in_name");
                const res = await fetch(`${baseUrl}/api/CheckSignonTableByName`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name
                    })
                });
            
                const data = await res.json();
                if(data){
                    for(var item of data){
                        setLoggedInObj({
                            admin: item.admin === 1,
                            userloggedIn: item.name,
                        });
                    }
                } else{
                    console.log("No Valid Data Present for User");
                }
            }
            catch(error){
                console.log("Error fetching perm by name");
            }}
            fetchPermissions();
        },[]); 
        // Return interface object
        return LoggedIn;
}


export default function Portal() {
    const loggedIn = localStorage.getItem("logged_in_name");
    if (!loggedIn) return <Navigate to="/" replace />;
    const isAdmin = GetPermissions();
    return(
        <>
        <main>
        <div className="mainPortalContainer">
            <SideBar levelOfUser={!!isAdmin?.admin} />
            <div className="loggedInMainContainer">
                <div className="loggedinLeftContainer">
                    <GetCurrentYear />
                    <div className="userLoggedinContainer">
                        <h1 className="loggedinUserText">Welcome back: {isAdmin?.userloggedIn}</h1>
                        <h3 className="loggedInSubText">Always Stay Connected with modern tools, and features</h3>
                    </div>  
                </div>
                    <details className="collapse border w-full dashboardCollapse" name="my-accordion-det-1" open>
                    <summary className="collapse-title font-semibold">Dashboard Stats</summary>
                    <section className="dashboardMain">
                    <div className="collapse-content text-sm"></div>
                        <DashboardStat dashboardName="Views" />
                        <DashboardStat dashboardName="Ticket Logged" />
                        <DashboardStat dashboardName="Views" />
                        <DashboardStat dashboardName="Ticket Logged" />
                    </section>
                    </details>
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )
}