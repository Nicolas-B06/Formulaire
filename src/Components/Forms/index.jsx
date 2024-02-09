import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';
import Toast from '../Toaster';
import { isOver18,isValidDate, isValidFrenchPostalCode, isValidName, isValidEmail } from '../../Utils/validation';

const Forms = () => {
    // État pour stocker les erreurs de validation des champs
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        dateNaissance: '',
        ville: '',
        codePostal: '',
    });
    // État pour stocker les erreurs de validation des champs
    const [fieldErrors, setFieldErrors] = useState({
        nom: '',
        prenom: '',
        email: '',
        dateNaissance: '',
        ville: '',
        codePostal: '',
    });

    // État pour gérer les notifications (toaster)
    const [toaster, setToaster] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    /**
         * handleChange - Met à jour les données de l'utilisateur et réinitialise les erreurs de validation pour le champ modifié.
         * 
         * @param {Object} e - L'événement déclenché par le changement d'input.
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: '' });
    };

    /**
     * areFieldsFilled - Vérifie si tous les champs du formulaire sont remplis.
     * 
     * @returns {boolean} - True si tous les champs sont remplis, sinon false.
     */
    const areFieldsFilled = () => {
        return Object.values(userData).every(value => value);
    };

    /**
     * validateFields - Valide les champs du formulaire et retourne les erreurs de validation.
     * 
     * @returns {Object} - Un objet contenant les messages d'erreur de validation pour chaque champ.
     */
    const validateFields = () => {
        const errors = {};
        if (!isValidName(userData.nom)) errors.nom = 'Nom invalide.';
        if (!isValidName(userData.prenom)) errors.prenom = 'Prénom invalide.';
        if (!isValidEmail(userData.email)) errors.email = 'Email invalide.';
        if (!isValidDate(userData.dateNaissance)) errors.dateNaissance = 'Date de naissance invalide format requis JJ/MM/AAAA.';
        if (isValidDate(userData.dateNaissance) && !isOver18(userData.dateNaissance)) errors.dateNaissance = 'Vous devez avoir plus de 18 ans.';
        if (!isValidName(userData.ville)) errors.ville = 'Ville invalide.';
        if (!isValidFrenchPostalCode(userData.codePostal)) errors.codePostal = 'Code postal invalide.';
        return errors;
    };

    /**
     * handleSubmit - Gère la soumission du formulaire.
     * 
     * Valide les champs et, si aucune erreur n'est détectée, enregistre les données utilisateur et affiche une notification de succès.
     * Sinon, met à jour l'état avec les erreurs de validation et affiche une notification d'erreur.
     * 
     * @param {Object} e - L'événement de soumission du formulaire.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateFields();
        if (Object.keys(errors).length === 0) {
            localStorage.setItem('userData', JSON.stringify(userData));
            setToaster({ open: true, message: 'Inscription réussie !', severity: 'success' });
            setUserData({
                nom: '',
                prenom: '',
                email: '',
                dateNaissance: '',
                ville: '',
                codePostal: '',
            });
        } else {
            setFieldErrors(errors);
            setToaster({ open: true, message: 'Veuillez corriger les erreurs avant de soumettre.', severity: 'error' });
        }
    };

    /**
     * handleClose - Gère la fermeture des notifications.
     * 
     * Ne ferme pas la notification si l'utilisateur clique à l'extérieur (raison 'clickaway').
     * 
     * @param {Object} event - L'événement de fermeture de la notification.
     * @param {string} reason - La raison de la fermeture de la notification.
     */
    const handleClose = (event, reason) => {

        setToaster({ ...toaster, open: false });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Inscription
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {Object.keys(userData).map((key) => (
                        <Grid item xs={12} key={key}>
                            <TextField
                                required
                                fullWidth
                                id={key}
                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                name={key}
                                autoComplete={key}
                                variant="outlined"
                                value={userData[key]}
                                onChange={handleChange}
                                error={!!fieldErrors[key]}
                                helperText={fieldErrors[key]}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!areFieldsFilled()} // Le bouton est activé si tous les champs sont remplis
                        >
                            Enregistrer
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Toast open={toaster.open} handleClose={handleClose} message={toaster.message} severity={toaster.severity} />
        </Container>
    );
};

export default Forms;

