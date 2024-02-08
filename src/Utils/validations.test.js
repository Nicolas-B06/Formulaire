import { calculateAge, isOver18, isValidFrenchPostalCode, isValidName, isValidEmail } from './validation';

describe('validations functions', () => {

  // Teste la fonction calculateAge pour vérifier si elle calcule correctement l'âge
  test('calculateAge should calculate age correctly', () => {
    const today = new Date();
    const birthDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 20}`;
    expect(calculateAge(birthDate)).toBe(20);
  }); 

  // Teste calculateAge pour s'assurer qu'elle gère correctement les anniversaires plus tard dans le mois courant
  test('calculateAge should correctly handle birthdays later in the current month', () => {
    const today = new Date();
    const futureDay = today.getDate() < 28 ? today.getDate() + 2 : 1;
    const futureMonth = today.getDate() < 28 ? today.getMonth() + 1 : today.getMonth() + 2;
    const birthDateThisMonth = `${futureDay}/${futureMonth}/${today.getFullYear() - 18}`;
    expect(calculateAge(birthDateThisMonth)).toBe(17);
  }); 

  // Teste la fonction isOver18 pour confirmer qu'elle valide correctement si une personne est majeure
  test('isOver18 should validate age correctly', () => {
    const today = new Date();
    const over18Date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 20}`;
    const exactly18Date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 18}`;
    const under18Date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 17}`;

    expect(isOver18(over18Date)).toBeTruthy();
    expect(isOver18(exactly18Date)).toBeTruthy();
    expect(isOver18(under18Date)).toBeFalsy();
  });

  // Vérifie que isValidFrenchPostalCode valide correctement un code postal français
  test('isValidFrenchPostalCode should validate a French postal code correctly', () => {
    expect(isValidFrenchPostalCode('06600')).toBeTruthy();
    expect(isValidFrenchPostalCode('ABCDE')).toBeFalsy();
  });

  // Teste isValidName pour s'assurer qu'elle valide correctement les noms
  test('isValidName should validate names correctly', () => {
    expect(isValidName('Jean-Michel')).toBeTruthy();
    expect(isValidName('12345')).toBeFalsy();
    expect(isValidName('oui@!')).toBeFalsy();
  })

  // Vérifie que isValidEmail valide correctement les adresses email
  test('isValidEmail should validate emails correctly', () => {
    expect(isValidEmail('email@example.com')).toBeTruthy();
    expect(isValidEmail('not-an-email')).toBeFalsy();
  });
});
