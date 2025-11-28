"use client";

interface FormInputProps {
    type: string;
    inputType: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormComp({type, inputType,value, onChange} : FormInputProps){
    return(
        // Returns the Form Container With Label & Input
        <div className={`signIn${type}Container`}>
            <label htmlFor={`${type}Input`} className="SignInformLabel">Enter {type}</label>
            <input 
            type={inputType} 
            id={`${type}Input`} 
            value={value}
            onChange={onChange}
            className="SignInformInput"/>
        </div>
    )
}