import React from 'react';
import Toaster from ".";
import Forms from "../Forms"
import { render, screen, fireEvent } from '@testing-library/react';

// Simulation du localStorage pour tester les interactions qui dépendent de celui-ci
const mockLocalStorage = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

// Réinitialise le localStorage simulé avant chaque test
beforeEach(() => {
    global.localStorage = mockLocalStorage;
    mockLocalStorage.clear();
});

describe('Toaster', () => {
    // Vérifie que le composant Toaster se rend correctement sans erreur
    it('renders without error', () => {
        render(<Toaster open={true} severity="error" message="erreur" />);
        expect(screen.getByText('erreur')).toBeInTheDocument();
    });

    // Teste l'affichage du message d'erreur lorsque la sévérité est définie sur 'error'
    it('should display an error message when severity is error', () => {
        render(<Toaster open={true} severity="error" message="erreur" />);
        expect(screen.getByRole('alert')).toHaveTextContent('erreur');
    });

    // Vérifie que le Toaster n'est pas visible lorsque la prop 'open' est fausse
    it('should not be visible when open is false', () => {
        render(<Toaster open={false} severity="error" message="erreur" />);
        expect(screen.queryByText('erreur')).not.toBeInTheDocument();
    });

    // Teste l'affichage d'une notification d'erreur et des messages d'erreur en rouge lors d'une soumission échouée
    it('should display error toaster and error messages in red on failed submission', async () => {
        render(<Forms />);
        // Simule une saisie invalide pour l'email et soumet le formulaire
        const inputs = screen.getAllByRole('textbox');
        fireEvent.change(inputs[2], { target: { value: 'example.com' } });
        fireEvent.submit(screen.getByText('Enregistrer'));

        // Vérifie l'affichage de la notification d'erreur et du message d'erreur spécifique
        expect(await screen.findByRole('alert')).toHaveTextContent('Veuillez corriger les erreurs avant de soumettre.');

        const errorMessage = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'p' && content.includes('Email invalide.');
        });
        expect(errorMessage).toHaveClass('Mui-error');
    });

    // Teste l'affichage d'une notification de succès et d'un message de succès lors d'une soumission réussie
    it('should display success toaster and success message on successful submission', async () => {
        render(<Forms />);
        // Remplit tous les champs correctement et soumet le formulaire
        const inputs = screen.getAllByRole('textbox');
        fireEvent.change(inputs[0], { target: { value: 'Jean' } });
        fireEvent.change(inputs[1], { target: { value: 'Dupont' } });
        fireEvent.change(inputs[2], { target: { value: 'email@example.com' } });
        fireEvent.change(inputs[3], { target: { value: '23/08/1993' } });
        fireEvent.change(inputs[4], { target: { value: 'Antibes' } });
        fireEvent.change(inputs[5], { target: { value: '06600' } });

        fireEvent.submit(screen.getByText('Enregistrer'));

        // Vérifie l'affichage de la notification de succès
        expect(await screen.findByRole('alert')).toHaveTextContent('Inscription réussie !');
    });
});
