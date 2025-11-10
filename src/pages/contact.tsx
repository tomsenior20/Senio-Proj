import "../styling/contact.css" 

    function ContactHeader(){
        return(
            <header className="contactHeaderContainer">
                <h1 className="contactHeader">Contact</h1>
            </header>
        )
    }

    function GenerateInput({type, message} : {type: string, message:string}){
        return(
            <div className={type + "container"}>
                <label className="formLabel" htmlFor={type + "input"}>Enter {message}</label>
                <input type={type} className="formInput" id={type + "input"}></input>
            </div>
        )
    }

    function GenerateContactForm(){
        return(
            <div className="formContainer">
                <form action="#" className="contactFormContainer">
                    <div className="inputContainer">
                        <GenerateInput type="text" message="Name"></GenerateInput>
                        <GenerateInput type="number" message="Number"></GenerateInput>
                        <div className="textcontainer">
                        <label className="formLabel" htmlFor="messageText">Enter Message</label>
                        <textarea id="messageText" className="formInputTextArea" >
                            
                        </textarea>
                        </div>
                    </div>
                    <div className="formButtonContainer">
                    <button type="submit" className="contactFormButton">Submit Form
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 submitformicon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    </div>
                </form>
            </div>
        )
    }

export default function Contact(){
    return(
        <>
        <ContactHeader/> 
        <GenerateContactForm/>
        </>
    )
}