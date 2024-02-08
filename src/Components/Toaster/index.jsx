import React from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * Toaster - Un composant pour afficher des notifications contextuelles (toasts).
 *
 * Ce composant utilise `Snackbar` et `Alert` de Material-UI pour afficher des messages d'alerte à l'utilisateur.
 * Les notifications peuvent être configurées avec différents niveaux de sévérité et sont automatiquement masquées après un délai.
 *
 * Props :
 * - open (boolean) : Contrôle l'affichage de la notification. Si vrai, la notification est visible.
 * - handleClose (function) : La fonction à appeler lorsque la notification doit être fermée. Cela peut se produire automatiquement après le délai, ou lorsque l'utilisateur interagit avec le composant de fermeture.
 * - message (string) : Le message à afficher dans la notification.
 * - severity (string) : Le niveau de sévérité de la notification, qui influence sa couleur. Les valeurs acceptées sont "error", "warning", "info", et "success".
 *
 * Exemple d'utilisation :
 * <Toaster
 *   open={true}
 *   handleClose={() => {}}
 *   message="Votre action a été enregistrée avec succès."
 *   severity="success"
 * />
 */
const Toaster = ({ open, handleClose, message, severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toaster;