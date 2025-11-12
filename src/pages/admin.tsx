import "../styling/admin.scss";
import FormInput from '../components/formcomp.tsx';

export default function Admin(){

    function GenerateLogInForm(){
        return(
            <>
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
            </>
        )
    }
    return(
        <section className="adminContainer">
                <div className="loginContainer">
                    <GenerateLogInForm />
                </div>
                <div className="registerContainer">
                    <div>
                        Register
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam officia velit autem accusamus nobis? Maxime, officia quos labore totam nulla illo beatae veritatis accusamus reiciendis similique pariatur, perspiciatis quis ex. Fugiat pariatur perspiciatis cumque! Tempore, cum ipsam! Placeat consequuntur eum, ab necessitatibus sit earum modi hic, facere reprehenderit molestiae et labore nemo id porro! Quas iusto alias aspernatur aliquam, assumenda error eos sunt magni eius vero, veniam odio sed corporis illum harum vel commodi facilis ut possimus hic reprehenderit adipisci tempore. Velit perferendis atque in, similique, debitis ullam praesentium laudantium saepe sint odit, minima eligendi nobis enim ab quibusdam.
                    </div>
                </div>
        </section>
    )
}