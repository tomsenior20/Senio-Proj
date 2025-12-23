import FormInput from '../../components/form/formcomp';

export default function GenerateLogInForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogIn,
}: any) {
  return (
    <div className='loginContainer'>
      <form className='loginForm'>
        <div className='mainFormContainer'>
          <FormInput
            type='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputType='text'
          />

          <FormInput
            type='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputType={showPassword ? 'text' : 'password'}
          />

          <div className='showPasswordContainer'>
            <input
              type='checkbox'
              id='passwordToggle'
              className='toggleInput toggle toggle-primarary'
              checked={showPassword}
              onChange={() => setShowPassword((prev: boolean) => !prev)}
            />
            <label htmlFor='passwordToggle' className='toggleText'>
              Show Password
            </label>
          </div>

          <div className='signInButtonContainer'>
            <button
              className='btn btn-outline btn-primary signInButton'
              onClick={handleLogIn}
            >
              Sign In
            </button>
          </div>
        </div>
        <hr />
        <div className='forgotPassword'>
          <a href='#' className='forgotPasswordText'>
            Forgot Password
          </a>
        </div>
      </form>
    </div>
  );
}
