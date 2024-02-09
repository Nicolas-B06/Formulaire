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
  // Teste la fermeture du toaster lorsque l'utilisateur clique sur la fermeture
  test('toaster should close when handleClose is triggered', async () => {
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

  // Vérifie que le formulaire est réinitialisé après une soumission réussie
  it('should reset the form after successful submission', async () => {
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
    expect(screen.getByRole('alert')).toHaveTextContent('Inscription réussie !');

    // Vérifier que le formulaire a été réinitialisé
    expect(inputs[0]).toHaveValue('');
    expect(inputs[1]).toHaveValue('');
    expect(inputs[2]).toHaveValue('');
    expect(inputs[3]).toHaveValue('');
    expect(inputs[4]).toHaveValue('');
    expect(inputs[5]).toHaveValue('');

    // Nettoyer le localStorage après le test pour éviter les interférences entre les tests
    localStorage.clear();
  });

  // vérifie si les messages d'erreur sont correctement affichés sous les input en cas de soumission échouée
  it('should display error messages under inputs on failed submission', async () => {
    render(<Forms />);
    // Simule une saisie invalide pour l'email et soumet le formulaire
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Je885an' } });
    fireEvent.change(inputs[1], { target: { value: 'Dupont45' } });
    fireEvent.change(inputs[2], { target: { value: 'example.com' } });
    fireEvent.change(inputs[3], { target: { value: '230802005' } });
    fireEvent.change(inputs[4], { target: { value: 'Antibes36' } });
    fireEvent.change(inputs[5], { target: { value: '0660' } });
    fireEvent.submit(screen.getByText('Enregistrer'));

    // Vérifie l'affichage des messages d'erreur sous les champs correspondants
    expect(await screen.findByText('Nom invalide.')).toBeInTheDocument();
    expect(await screen.findByText('Prénom invalide.')).toBeInTheDocument();
    expect(await screen.findByText('Email invalide.')).toBeInTheDocument();
    expect(await screen.findByText('Date de naissance invalide format requis JJ/MM/AAAA.')).toBeInTheDocument();
    expect(await screen.findByText('Ville invalide.')).toBeInTheDocument();
    expect(await screen.findByText('Code postal invalide.')).toBeInTheDocument();

    localStorage.clear();
  });

  // vérifie si le message d'erreur spécifique est affiché sous l'input dateNaissance si l'utilisateur est mineur
  it('should display specific error message under dateNaissance input if user is under 18', async () => {
    render(<Forms />);
    // Remplit tous les champs du formulaire avec des valeurs valides
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jean' } });
    fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
    fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
    fireEvent.change(inputs[3], { target: { value: '23/08/2023' } });
    fireEvent.change(inputs[4], { target: { value: 'Antibes' } });
    fireEvent.change(inputs[5], { target: { value: '06600' } });

    fireEvent.submit(screen.getByText('Enregistrer'));

    // Vérifie l'affichage du message d'erreur spécifique
    expect(await screen.findByText('Vous devez avoir plus de 18 ans.')).toBeInTheDocument();

    localStorage.clear();
  });

});


