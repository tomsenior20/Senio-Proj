'use client';
import { useNavigate } from 'react-router-dom';
import '../styling/admin.scss';
import FormInput from '../components/formcomp';
import { useEffect, useState } from 'react';
import RemoveDirect from '../components/removeDirect';
import ErrorAlert from '../components/messages/error';
import GetAPI from '../components/api/api';

interface LogInformInputs {
  username: string;
  password: string;
}

function RegisterComponent() {
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

function GenerateLogInForm({
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

export default function Admin() {
  // State Adding
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  // Use Navigate Import
  const navigate = useNavigate();

  async function handleLogIn(e: any) {
    e.preventDefault();

    if ((!email && !password) || (email && !password) || (!email && password)) {
      setErrorMessage('Inputs are invalid');
      setShowError(true);
      return;
    }

    try {
      const data = await GetAPI({
        APIEndPoint: 'CheckSignon',
        body: { email, password },
      });

      // Check Data is valid and there
      if (data) {
        // Check records retrived > 1 means record found
        if (data.length) {
          // re-direct to portal
          localStorage.setItem('logged_in_name', data[0].name);
          navigate('/portal');
        } else {
          setErrorMessage("Either email or password doesn't match our records");
          setShowError(true);
        }
      } else {
        setErrorMessage('Login Failed');
        setShowError(true);
      }
    } catch (error) {
      console.log('Error signining in' + error);
    }
  }

  return (
    <>
      <ErrorAlert show={showError} message={errorMessage ?? ''} />
      <section className='adminContainer'>
        <RemoveDirect />
        <GenerateLogInForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleLogIn={handleLogIn}
        />
        <RegisterComponent />
      </section>
    </>
  );
}
