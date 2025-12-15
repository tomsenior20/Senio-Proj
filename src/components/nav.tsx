    import { useEffect, useState } from "react"
    import '../styling/nav.scss';
    import BrandName from '../hooks/useNavBrandName.tsx';
    import { useLocation } from "react-router-dom";

    interface MobileListProps{
        isMobile : boolean, 
        currentPath : string
    }


    export default function Navigation() {
        const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
        const [menuOpen, setMenuOpen] = useState<boolean>(false);
        const location = useLocation();
        useEffect(() => {
            const handleResize = () => setIsMobileScreen(window.innerWidth < 750);
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        useEffect(() => {
            document.body.style.overflow  = (menuOpen) ? "hidden" : "";
        }, [menuOpen]);

        // Mobile Menu Click
        function mobileMenuClick(){
            setMenuOpen(menuOpen ? false : true);
        }

        // Generate Mobile List Items
        function ListItems({ isMobile, currentPath } : MobileListProps){
            let Links = [
                {name: "Home", path:  "/", },
                {name: "Contact", path:  "/contact", },
                {name: "Admin", path:  "/Admin", },
            ];
            
            // Hides Admin Link from menu if on portal page
            if (currentPath === "/portal") {
                Links = Links.filter(link => link.name !== "Admin");
                Links.push({ name: "Log Out", path: "/" });
            }           
            return(
                <>
                {Links.filter(a => a.path !== currentPath).map((item) => (
                <li className={isMobile ? 'mobileMenu' : 'navigationLinkList'} id={item.name} key={item.name}>
                    <a href={item.path}>{item.name}</a>
                    </li>
                ))}
                </>
            )
        }
        
        function MobileList(){
            return(
                <div className="MobileMenuListContainer">
                    {isMobileScreen ? (
                        <button  onClick={mobileMenuClick} className="mobileMenuButton">
                            <span className="mobileBar"></span>
                            <span className="mobileBar"></span>
                            <span className="mobileBar"></span>                        
                        </button>
                    ) : (
                        <ListItems isMobile={false} currentPath={location.pathname}/>
                    )}
                </div>
            )
        }

        return(
            <>
            <nav>
                <BrandName />
                <MobileList />
            </nav>
            {isMobileScreen && menuOpen && (
                <div className={`mobileMenuContainer ${menuOpen ? "open" : ""} `}>
                    <ListItems isMobile={true} currentPath={location.pathname}/>
                </div>
            )}
            </>
        );
    }