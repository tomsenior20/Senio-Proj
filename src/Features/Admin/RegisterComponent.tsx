export default function RegisterComponent() {
  return (
    <div className='registerContainer'>
      <div className='headerRegisterContainer'>
        <h1 className='mainHeaderRegister'>
          Process, Humans and tools meant to success together
        </h1>
        <h3 className='subHeaderRegister'>
          Boost Productivity, without needing expensive resources through
          utilising modern technology today.
        </h3>
      </div>

      <div className='registerButtonContainer'>
        <button className='registrationButton btn btn-outline'>
          Register Here
        </button>
      </div>

      <div className='techImageContainer'>
        <img className='techimage' src='/public/Tech.png' alt='tech image' />
      </div>
    </div>
  );
}
