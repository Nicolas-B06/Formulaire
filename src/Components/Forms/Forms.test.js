import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Forms from '.';

describe('Forms Component', () => {

  // Vérifie que le bouton est initialement désactivé lors du rendu du composant Forms
  test('button should be initially disabled', () => {
    render(<Forms />);
    const button = screen.getByRole('button', { name: /enregistrer/i });
    expect(button).toBeDisabled();
  });

  // Teste si le bouton devient activé une fois que tous les champs sont remplis
  test('button should be enabled when all fields are filled', () => {
    render(<Forms />);
    // Remplit tous les champs de texte avec des valeurs valides
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jean' } });
    fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
    fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
    fireEvent.change(inputs[3], { target: { value: '23/08/1993' } });
    fireEvent.change(inputs[4], { target: { value: 'Antibes' } });
    fireEvent.change(inputs[5], { target: { value: '06600' } });

    const button = screen.getByRole('button', { name: /enregistrer/i });
    expect(button).not.toBeDisabled();
  });
  // Teste la fermeture du toaster lorsque l'utilisateur clique en dehors
  test('toaster should close when handleClose is triggered with a reason other than clickaway', async () => {
    render(<Forms />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jean' } });
    fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
    fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
    fireEvent.change(inputs[3], { target: { value: '23/08/1993' } });
    fireEvent.change(inputs[4], { target: { value: 'Antibes' } });
    fireEvent.change(inputs[5], { target: { value: '06600' } });

    const button = screen.getByRole('button', { name: /enregistrer/i });
    fireEvent.click(button); // Simule une soumission de formulaire

    const closeIcon = screen.getByTestId('CloseIcon');
    fireEvent.click(closeIcon); // simule un click sur le bouton de fermeture du toaster

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument(); // vérifie que le toaster n'est plus affiché
    });
  });

  // Tester la sauvegarde des données utilisateur dans le localStorage lors d'une soumission réussie
  it('should save user data to localStorage on successful submission', async () => {
    render(<Forms />);
    
    // Remplir tous les champs du formulaire avec des valeurs valides
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jean' } });
    fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
    fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
    fireEvent.change(inputs[3], { target: { value: '23/08/1993' } });
    fireEvent.change(inputs[4], { target: { value: 'Antibes' } });
    fireEvent.change(inputs[5], { target: { value: '06600' } });
  
    // Soumettre le formulaire
    fireEvent.submit(screen.getByText('Enregistrer'));

    // Attendre un indicateur de soumission réussie 
    await screen.findByText('Inscription réussie !');

    // Vérifier que les données ont été sauvegardées dans le localStorage
    const userData = localStorage.getItem('userData');
    expect(userData).not.toBeNull();

    const parsedData = JSON.parse(userData);
    expect(parsedData).toEqual(expect.objectContaining({
      nom: 'Jean',
      prenom: 'Dupont',
      email: 'email@example.com',
      dateNaissance: '23/08/1993',
      ville: 'Antibes',
      codePostal: '06600',
    }));
  
    // Nettoyer le localStorage après le test pour éviter les interférences entre les tests
    localStorage.clear();
  });
});


