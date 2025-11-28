    import { useEffect, useState } from "react"
    import '../styling/nav.scss';
    import BrandName from '../hooks/useNavBrandName.tsx';

    export default function Navigation() {
        const [isMobileScreen, setIsMobileScreen] = useState(false);
        const [menuOpen, setMenuOpen] = useState(false);

        useEffect(() => {
            const handleResize = () => setIsMobileScreen(window.innerWidth < 750);
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        // Mobile Menu Click
        function mobileMenuClick(){
            setMenuOpen(menuOpen ? false : true);
        }

        // Generate Mobile List Items
        function GenerateListItems({ isMobile } : {isMobile : boolean}){
            const currentPath : string  = location.pathname;
            let Links = [
                {name: "Home", path:  "/", },
                {name: "Contact", path:  "/contact", },
                {name: "Admin", path:  "/Admin", },
            ];
            
            // Hides Admin Link from menu if on portal page
            if (currentPath === "/Portal") {
                Links = Links.filter(link => link.name !== "Admin");
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
        
        function GenerateMobileList(){
            const [isMobile, setIsMobile] = useState(false);

            useEffect(() => {
                const handleResize = () => setIsMobile(window.innerWidth < 750);
                handleResize();
                window.addEventListener("resize", handleResize);
                return () => window.removeEventListener("resize", handleResize);
            },[]);

            return(
                <>
                    {isMobile ? (
                        <button  onClick={mobileMenuClick} className="mobileMenuButton">
                            <span className="mobileBar"></span>
                            <span className="mobileBar"></span>
                            <span className="mobileBar"></span>                        
                        </button>
                    ) : (
                        <GenerateListItems isMobile={false}/>
                    )}
                </>
            )
        }

        return(
            <>
            <nav>
                <BrandName />
                <div className="MobileMenuListContainer">
                    <GenerateMobileList />
                </div>
            </nav>
            {isMobileScreen && menuOpen && (
                <div className="mobileMenuContainer">
                    <GenerateListItems isMobile={true}/>
                </div>
            )}
            </>
        );
    }