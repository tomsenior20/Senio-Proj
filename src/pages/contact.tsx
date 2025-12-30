import '../styling/contact.scss';
import Footer from '../components/layout/footer';
import RemoveDirect from '../components/common/removeDirect';
import ContactHeader from '../features/Contact/ContactHeader';
import GenerateContactForm from '../features/Contact/FormContainer';

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
