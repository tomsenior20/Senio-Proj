import React, { useEffect, useState } from 'react';
import '../styling/contact.scss';
import Footer from '../components/layout/footer';
import RemoveDirect from '../components/common/removeDirect';
import GetAPI from '../api/api';

interface FormData {
  name: string;
  number: string;
  email: string;
  product: string;
  message: string;
}

interface InputProps {
  type: string;
  message: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ContactHeader() {
  return (
    <header className='contactHeaderContainer'>
      <h1 className='contactHeader'>Contact</h1>
      <h3 className='contactSubHeader'>
        Please fill out the form below, we will be in contact as soon as
        possible
      </h3>
    </header>
  );
}

function GenerateInput({ type, message, value, onChange }: InputProps) {
  const [placeholderText, setPlaceholderText] = useState('');

  useEffect(() => {
    switch (message) {
      case 'Name':
        setPlaceholderText('Name');
        break;
      case 'Number':
        setPlaceholderText('Contact Number');
        break;
      case 'email':
        setPlaceholderText('Email Address');
        break;
      case 'product':
        setPlaceholderText('Product Name');
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className={type + 'container'}>
      <label className='formLabel' htmlFor={type + 'input'}>
        Enter {message}
      </label>
      <input
        type={type}
        className='formInput input neutral-content'
        placeholder={'Enter ' + placeholderText}
        id={type + 'input'}
        name={message.toLowerCase()}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
}

function GenerateContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    number: '',
    email: '',
    product: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    async function callAPI() {
      // Determine base url for fetch
      const data = await GetAPI({ APIEndPoint: 'saveQuery', body: formData });
      // Fetch to post Query
      if (data) {
        console.log('Form Data Submitted', new Date().toUTCString());
      }
      // Reset Form Data
      setFormData({
        name: '',
        number: '',
        email: '',
        product: '',
        message: '',
      });
    }

    callAPI();
  };

  return (
    <div className='formContainer'>
      <form onSubmit={HandleLogin} className='contactFormContainer'>
        <div className='inputContainer'>
          <GenerateInput
            type='text'
            message='Name'
            value={formData.name}
            onChange={handleChange}
          ></GenerateInput>
          <GenerateInput
            type='number'
            message='Number'
            value={formData.number}
            onChange={handleChange}
          ></GenerateInput>
          <GenerateInput
            type='email'
            message='email'
            value={formData.email}
            onChange={handleChange}
          ></GenerateInput>
          <GenerateInput
            type='text'
            message='product'
            value={formData.product}
            onChange={handleChange}
          ></GenerateInput>
          <div className='textAreacontainer'>
            <label className='formLabel' htmlFor='messageText'>
              Enter Message
            </label>
            <textarea
              id='messageText'
              name='message'
              className='formInputTextArea'
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className='formButtonContainer'>
          <button
            type='submit'
            className='contactFormButton btn btn-outline btn-primary'
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <RemoveDirect />
      <ContactHeader />
      <GenerateContactForm />
      <Footer />
    </>
  );
}
