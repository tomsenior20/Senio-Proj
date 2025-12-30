import { useState } from 'react';
import GenerateInput from './ContactInput';
import GenerateContactHero from './GenerateContactHero';
import GetAPI from '../../api/api';

interface FormData {
  name: string;
  number: string;
  email: string;
  product: string;
  message: string;
}

const isFormValid = (data: FormData): boolean => {
  return Object.values(data).every((value) => value.trim() !== '');
};

export default function GenerateContactForm() {
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
      const payload = {
        ...formData,
        time_logged: new Date().toISOString().slice(0, 19).replace('T', ' '),
      };

      const acknowledgementPayload = {
        name: formData.name,
        email: formData.email,
      };

      // Determine base url for fetch
      const [saveQueryRes, acknowledgeRes] = await Promise.all([
        GetAPI({ APIEndPoint: 'saveQuery', body: payload }),
        GetAPI({
          APIEndPoint: 'AcknowledgementTable',
          body: acknowledgementPayload,
        }),
      ]);

      // Fetch to post Query
      if (saveQueryRes && acknowledgeRes) {
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
      <GenerateContactHero />
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
            disabled={!isFormValid(formData)}
            className='contactFormButton btn btn-primary'
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}
