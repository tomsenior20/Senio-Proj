import "../styling/admin.scss";
import FormInput from '../components/formcomp.tsx';

export default function Admin(){
    function RegisterComponent(){
        return(
            <div className="registerContainer">
                <div className="headerRegisterContainer">
                    <h1 className="mainHeaderRegister">Process, Humans and tools meant to success together</h1>
                    <h3 className="subHeaderRegister">Boost Productivity, without needing expensive resources through utilising modern technoloogy today.</h3>
                </div>
                <div className="registerButtonContainer">
                    <button className="registrationButton">Register Here</button>
                </div>
                <div className="techImageContainer">
                    <img className="techimage" src="/public/Tech.png" alt="tech image"></img>
                </div>
            </div>
        )
    }
    function GenerateLogInForm(){
        return(
            <div className="loginContainer">
                <form className="loginForm">
                    <div className="mainFormContainer">
                    <FormInput type="Email" inputType="text" />
                    <FormInput type="Password" inputType="password" />
                    <div className="showPasswordContainer">
                        <input type="checkbox" id="passwordToggle" className="toggleInput"/>
                        <label htmlFor="passwordToggle" className="toggleText">Show Password</label>
                    </div>
                    <div className="signInButtonContainer">
                        <button className="signInButton">Sign In</button>
                    </div>
                    </div>
                    <hr></hr>
                    <div className="forgotPassword">
                        <a href="#" className="forgotPasswordText">Forgot Password</a>
                    </div>
                </form>
            </div>
        )
    }
    return(
        <section className="adminContainer">
            <GenerateLogInForm />
            <RegisterComponent />
        </section>
    )
}