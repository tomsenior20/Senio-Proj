import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import "../styling/sidebar.scss";

interface UserLevel {
    levelOfUser: boolean
}

export default function Sidebar({levelOfUser} : UserLevel ) {
    return(
        <div className="sideBarContainer">
            <div className="levelContainer">
                <h1 className="leveluserText">Level of user: </h1>
                <h2 className="levelText">{levelOfUser ? "Admin" : "Non Admin"}</h2>
            </div>
                {levelOfUser && (
                    <div className="adminAccessContainer">
                        <ul>
                            <li>
                                <button className="btn btn-active btn-primary w-full"><FaSearch className="adminIcon" />
                                <p className="buttonText">User Search</p>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-active btn-primary w-full"><FaCog className="adminIcon" />
                                <p className="buttonText">Access Management</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
        </div>
    )
}