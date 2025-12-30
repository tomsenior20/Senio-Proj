export default function ContactHeader() {
  const PageHeaderText: string = 'Contact';
  const PageSubText: string =
    'Please fill out the form below, well contact you as soon as possible';

  return (
    <header className='contactHeaderContainer'>
      <h1 className='contactHeader'>{PageHeaderText}</h1>
      <h3 className='contactSubHeader'>{PageSubText}</h3>
    </header>
  );
}
