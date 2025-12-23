import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import GenerateCurrentDate from './GenerateCurrentDate';

describe('GenerateCurrentDate', () => {
  test('Renders the current Date', () => {
    render(<GenerateCurrentDate />);

    const renderedText = screen.getByText((content) => {
      return content === new Date(content).toDateString();
    });

    expect(renderedText).toBeInTheDocument();
  });
});
