export default function FormComp({type, inputType} : {type: string, inputType:string}){
    return(
        // Returns the Form Container With Label & Input
        <div className={`signIn${type}Container`}>
            <label htmlFor={`${type}Input`} className="SignInformLabel">Enter {type}</label>
            <input type={inputType} id={`${type}Input`} className="SignInformInput"/>
        </div>
    )
}