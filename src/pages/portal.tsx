import { useEffect, useState } from "react";
import "../styling/portal.scss"
import Footer from '../components/footer';
import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { Navigate } from "react-router-dom";

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

function GenerateAdminMenu({admin} : {admin: boolean}){
    console.log(admin);

    return(
        <div className="levelContainer">
            <h1 className="leveluserText">Level of user: {admin ? "Admin" : "Non Admin"}</h1>
            {admin && (
                <div className="adminAccessContainer">
                    <ul>
                        <li>
                            <a href="#" className="adminMenu"><FaSearch className="adminIcon" />User Search</a>
                        </li>
                        <li>
                            <a href="#" className="adminMenu"><FaCog className="adminIcon" />Access Managements</a>
                        </li>
                    </ul>
                </div>
            )}
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
        <div className="mainPortalContainer">
            <div className="loggedInMainContainer">
                <div className="loggedinLeftContainer">
                    <GetCurrentYear />
                    <div className="userLoggedinContainer">
                        <h1 className="loggedinUserText">Welcome back: {isAdmin?.userloggedIn}</h1>
                        <h3 className="loggedInSubText">Always Stay Connected with modern tools, and features</h3>
                    </div>  
                </div>
                <div className="loggedinRightContainer">
                    <img src="/public/Person.png" alt="WelcomeContainer" className="welcomeImage"></img>
                </div>
            </div>
            <div className="dashboardContainer">
                <GenerateAdminMenu admin={isAdmin?.admin ?? false} />
            </div>
        </div>
        <Footer/>
        </>
    )
}