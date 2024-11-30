import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header'; // Adjust the import path as needed

describe('Header', () => {
    test('renders header component', () => {
        render(<Header />);

        // Check if the header element exists
        const headerElement = screen.getByTestId('header');
        expect(headerElement).toBeInTheDocument();

    });
    test('renders logo', () => {
        render(<Header />);


        // Check if the logo image exists within the header
        const logoImage = screen.getByRole('img', { src: 'logo.png' });
        expect(logoImage).toBeInTheDocument();
    });
});