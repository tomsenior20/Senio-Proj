import React, { useEffect, useState } from "react"
import "../styling/contact.scss" 
import Footer from '../components/footer';

    function ContactHeader(){
        return(
            <header className="contactHeaderContainer">
                <h1 className="contactHeader">Contact</h1>
            </header>
        )
    }

    function GenerateInput({type, message,  value, onChange} : {type: string, message:string,   value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}){
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
                <input type={type} className="formInput" placeholder={"Enter " + placeholderText} id={type + "input"} name={message.toLowerCase()} value={value} onChange={onChange}></input>
            </div>
        )
    }

    function GenerateContactForm(){

        const [formData, setFormData] = useState({
            name : "",
            number: "",
            email: "",
            product: "",
            message: ""
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        const HandleLogin = (e : React.FormEvent) => {
            e.preventDefault();
            // Determine base url for fetch
            const isLocalhost = window.location.hostname === "localhost";
            const baseUrl =  isLocalhost ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}` : `${import.meta.env.VITE_LAN_API_URL}:${import.meta.env.VITE_LAN_API_PORT}` ;
            // Fetch to post Query
            fetch(`${baseUrl}/api/saveQuery`, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                if(data){
                  console.log("Form Data Submitted", new Date().toUTCString());
                }
            })
            .catch(err => console.error(err));

            // Reset Form Data
            setFormData({
            name: "",
            number: "",
            email: "",
            product: "",
            message: ""
        });
        }

        return(
            <div className="formContainer">
                <form onSubmit={HandleLogin} className="contactFormContainer">
                    <div className="inputContainer">
                        <GenerateInput 
                        type="text" 
                        message="Name" 
                        value={formData.name} 
                        onChange={handleChange}>
                        </GenerateInput>
                        <GenerateInput 
                        type="number" 
                        message="Number" 
                        value={formData.number} 
                        onChange={handleChange}>
                        </GenerateInput>
                        <GenerateInput 
                        type="email" 
                        message="email" 
                        value={formData.email} 
                        onChange={handleChange}>
                        </GenerateInput>
                        <GenerateInput 
                        type="text" 
                        message="product" 
                        value={formData.product} 
                        onChange={handleChange}>
                        </GenerateInput>
                        <div className="textAreacontainer">
                        <label className="formLabel" htmlFor="messageText">Enter Message</label>
                        <textarea 
                        id="messageText"
                        name="message"
                        className="formInputTextArea"
                        value={formData.message}
                        onChange={handleChange}>  
                        </textarea>
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