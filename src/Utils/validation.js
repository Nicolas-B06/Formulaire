/**
 * Calcule l'âge d'une personne à partir de sa date de naissance.
 * 
 * @param {string} dateOfBirth - La date de naissance au format JJ/MM/AAAA.
 * @returns {number} L'âge calculé à partir de la date de naissance fournie.
 */
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

/**
 * Vérifie si une personne est majeure (âgée de 18 ans ou plus) à partir de sa date de naissance.
 * 
 * @param {string} dateOfBirth - La date de naissance au format JJ/MM/AAAA.
 * @returns {boolean} True si la personne a 18 ans ou plus, sinon false.
 */
export const isOver18 = (dateOfBirth) => {
    return calculateAge(dateOfBirth) >= 18;
};

/**
 * Valide le format d'un code postal français, qui doit être composé de 5 chiffres.
 * 
 * @param {string} postalCode - Le code postal à valider.
 * @returns {boolean} True si le format du code postal est valide, sinon false.
 */
export const isValidFrenchPostalCode = (postalCode) => {
    return /^\d{5}$/.test(postalCode);
};

/**
 * Valide un nom ou un prénom, autorisant les lettres (y compris les lettres accentuées) et les tirets.
 * Les espaces sont autorisés pour séparer les mots, mais pas au début ou à la fin.
 * 
 * @param {string} name - Le nom ou le prénom à valider.
 * @returns {boolean} True si le nom ou prénom est valide, sinon false.
 */
export const isValidName = (name) => {
    return /^[a-zA-ZÀ-ÿ-]+(?:\s+[a-zA-ZÀ-ÿ-]+)*$/.test(name);
};

/**
 * Valide une adresse email en utilisant une expression régulière basique.
 * Cette validation vérifie la présence d'un caractère '@' séparant le nom d'utilisateur et le domaine, 
 * suivi d'un point et d'une extension de domaine.
 * 
 * @param {string} email - L'adresse email à valider.
 * @returns {boolean} True si l'adresse email est valide, sinon false.
 */
export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(email);
};