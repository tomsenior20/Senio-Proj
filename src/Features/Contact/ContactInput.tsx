import { useState, useEffect } from 'react';

interface InputProps {
  type: string;
  message: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function GenerateInput({
  type,
  message,
  value,
  onChange,
}: InputProps) {
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
