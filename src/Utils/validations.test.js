import { calculateAge, isOver18, isValidFrenchPostalCode, isValidName, isValidEmail } from './validation';

describe('validations functions', () => {

  test('calculateAge should calculate age correctly', () => {
    const today = new Date();
    const birthDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 20}`;
    expect(calculateAge(birthDate)).toBe(20);
  }); 

  test('calculateAge should correctly handle birthdays later in the current month', () => {
    const today = new Date();
    const futureDay = today.getDate() < 28 ? today.getDate() + 2 : 1;
    const futureMonth = today.getDate() < 28 ? today.getMonth() + 1 : today.getMonth() + 2;
    const birthDateThisMonth = `${futureDay}/${futureMonth}/${today.getFullYear() - 18}`;
    expect(calculateAge(birthDateThisMonth)).toBe(17);
  }); 

  test('isOver18 should validate age correctly', () => {
    const today = new Date();
    const over18Date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 20}`;
    const exactly18Date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 18}`;
    const under18Date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear() - 17}`;

    expect(isOver18(over18Date)).toBeTruthy();
    expect(isOver18(exactly18Date)).toBeTruthy();
    expect(isOver18(under18Date)).toBeFalsy();
  });

  test('isValidFrenchPostalCode should validate a French postal code correctly', () => {
    expect(isValidFrenchPostalCode('06600')).toBeTruthy();
    expect(isValidFrenchPostalCode('ABCDE')).toBeFalsy();
  });

  test('isValidName should validate names correctly', () => {
    expect(isValidName('Jean-Michel')).toBeTruthy();
    expect(isValidName('12345')).toBeFalsy();
  })

  test('isValidEmail should validate emails correctly', () => {
    expect(isValidEmail('email@example.com')).toBeTruthy();
    expect(isValidEmail('not-an-email')).toBeFalsy();
  });
});