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
 * Vérifie si une date est valide.
 * 
 * @param {string} date - La date à valider.
 * @returns {boolean} True si la date est valide au format JJ/MM/YYYY, sinon false.
 */
export const isValidDate = (date) => {
    const parts = date.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
        return false;
    }

    const monthLength = [31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day > 0 && day <= monthLength[month - 1];
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