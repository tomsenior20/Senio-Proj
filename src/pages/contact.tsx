import React, { useEffect, useState } from 'react';
import '../styling/contact.scss';
import Footer from '../components/layout/footer';
import RemoveDirect from '../components/common/removeDirect';
import GetAPI from '../api/api';
import ContactHeader from '../features/Contact/ContactHeader';
import GenerateInput from '../features/Contact/ContactInput';

interface FormData {
  name: string;
  number: string;
  email: string;
  product: string;
  message: string;
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
