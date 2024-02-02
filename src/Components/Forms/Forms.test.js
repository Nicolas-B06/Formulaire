import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Forms from '.';

describe('Forms Component', () => {
  test('button should be initially disabled', () => {
    render(<Forms />);
    const button = screen.getByRole('button', { name: /enregistrer/i });
    expect(button).toBeDisabled();
  });

  test('button should be enabled when all fields are filled', () => {
    render(<Forms />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jean' } });
    fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
    fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
    fireEvent.change(inputs[3], { target: { value: '23/08/1993' } });
    fireEvent.change(inputs[4], { target: { value: 'Paris' } });
    fireEvent.change(inputs[5], { target: { value: '75000' } });

    const button = screen.getByRole('button', { name: /enregistrer/i });
    expect(button).not.toBeDisabled(); 
  });


});
