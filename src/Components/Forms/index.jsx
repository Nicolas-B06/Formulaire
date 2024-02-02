import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';
import Toast from '../Toaster';
import { isOver18, isValidFrenchPostalCode, isValidName, isValidEmail } from '../../Utils/validation';

const Forms = () => {
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        dateNaissance: '',
        ville: '',
        codePostal: '',
    });

    const [fieldErrors, setFieldErrors] = useState({
        nom: '',
        prenom: '',
        email: '',
        dateNaissance: '',
        ville: '',
        codePostal: '',
    });

    const [toaster, setToaster] = useState({
        open: false,
        message: '',
        severity: 'success', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: '' });
    };

    const areFieldsFilled = () => {
        return Object.values(userData).every(value => value);
    };

    const validateFields = () => {
        const errors = {};
        if (!isValidName(userData.nom)) errors.nom = 'Nom invalide.';
        if (!isValidName(userData.prenom)) errors.prenom = 'Prénom invalide.';
        if (!isValidEmail(userData.email)) errors.email = 'Email invalide.';
        if (!isOver18(userData.dateNaissance)) errors.dateNaissance = 'Vous devez avoir plus de 18 ans.';
        if (!isValidName(userData.ville)) errors.ville = 'Ville invalide.';
        if (!isValidFrenchPostalCode(userData.codePostal)) errors.codePostal = 'Code postal invalide.';
        return errors;
    };

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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
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

