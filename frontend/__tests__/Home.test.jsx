import {jest} from '@jest/globals'
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Index from '@/pages';

describe('Articles', () => {
  it('should have Docs text', () => {
    render(<Articles />); // Arrange
    const element = screen.getByText('Docs'); // Act
    expect(element).toBeInTheDocument(); // Assert
  });

  it('should have given sentence', () => {
    render(<Articles />); // Arrange
    const element = screen.getByText(/Page containing/i); // Act
    expect(element).toBeInTheDocument(); // Assert
  });
});