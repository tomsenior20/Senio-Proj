import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorAlert from './error';

describe('ErrorAlert', () => {
  test('renders the error alert when show is true', () => {
    render(<ErrorAlert show={true} message='Something went wrong' />);

    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Something went wrong');
  });

  test('does not render the error alert when show is false', () => {
    render(<ErrorAlert show={false} message='Hidden error' />);

    const alert = screen.queryByRole('alert');

    expect(alert).not.toBeInTheDocument();
  });

  test('renders the correct error message', () => {
    const message = 'Invalid username or password';

    render(<ErrorAlert show={true} message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
