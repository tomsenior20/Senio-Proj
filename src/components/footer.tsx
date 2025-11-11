import '../styling/footer.scss';

export default function Footer() {

    function GetCurrentDate(){
        var curDate = new Date().getFullYear();
        return(
            <div className='curDateContainer'>
                <p className="curDateText">&copy;{curDate}</p>
            </div>
        )
    }


    return(
        <footer>
            <GetCurrentDate />
        </footer>
    )
    
}