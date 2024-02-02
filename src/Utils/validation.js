export const calculateAge = (dateOfBirth) => {
    const parts = dateOfBirth.split('/');
    const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

// Valide si l'âge est supérieur à 18 ans
export const isOver18 = (dateOfBirth) => {
    return calculateAge(dateOfBirth) >= 18;
};

// Valide le format du code postal français (5 chiffres)
export const isValidFrenchPostalCode = (postalCode) => {
    return /^\d{5}$/.test(postalCode);
};

// Valide les noms et prénoms (lettres, accents, tirets acceptés)
export const isValidName = (name) => {
    return /^[a-zA-ZÀ-ÿ-]+(?:\s+[a-zA-ZÀ-ÿ-]+)*$/.test(name);
};

// Valide l'email
export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(email);
};