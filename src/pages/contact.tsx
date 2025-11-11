import { useEffect, useState } from "react"
import "../styling/contact.scss" 
import Footer from '../components/footer';

    function ContactHeader(){
        return(
            <header className="contactHeaderContainer">
                <h1 className="contactHeader">Contact</h1>
            </header>
        )
    }

    function GenerateInput({type, message} : {type: string, message:string}){
        const [placeholderText, setPlaceholderText] = useState("");

        useEffect(() => {
            switch(message){
                case "Name":
                    setPlaceholderText("Name");
                    break;
                case "Number":
                    setPlaceholderText("Contact Number");
                    break;
                case "email":
                    setPlaceholderText("Email Address");
                    break;
                case "product":
                    setPlaceholderText("Product Name");
                    break;
                default:
                    break;
            }
        },[]);

        return(
            <div className={type + "container"}>
                <label className="formLabel" htmlFor={type + "input"}>Enter {message}</label>
                <input type={type} className="formInput" placeholder={"Enter " + placeholderText} id={type + "input"}></input>
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
                        <GenerateInput type="email" message="email"></GenerateInput>
                        <GenerateInput type="text" message="product"></GenerateInput>
                        <div className="textAreacontainer">
                        <label className="formLabel" htmlFor="messageText">Enter Message</label>
                        <textarea id="messageText" className="formInputTextArea" ></textarea>
                        </div>
                    </div>
                    <div className="formButtonContainer">
                    <button type="submit" className="contactFormButton">Submit Form
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
        <Footer/>
        </>
    )
}