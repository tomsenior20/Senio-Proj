import '../styling/footer.scss';

export default function Footer() {

    function GetCurrentDate({curDate}: {curDate: number}){
        return(
            <div className='curDateContainer'>
                <p className="curDateText">&copy;{curDate}</p>
            </div>
        )
    }

    return(
        <footer className='footer'>
            <GetCurrentDate curDate={new Date().getFullYear()}/>
        </footer>
    )  
}