import '../../styling/messages/error.scss';

interface ErrorAlertProps {
  show: boolean;
  message: string;
}

export default function ErrorAlert({ show, message }: ErrorAlertProps) {
  return (
    <>
      {show && (
        <div role='alert' className='alert alert-error errorAlert m-1!'>
          <span>{message}</span>
        </div>
      )}
    </>
  );
}
