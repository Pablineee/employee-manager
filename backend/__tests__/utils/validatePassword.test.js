const validatePassword = require('../../utils/validatePassword');

test('validates password correctly', () => {
    expect(validatePassword('Password123!')).toBe(true);
    expect(validatePassword('password123!')).toBe(false);
    expect(validatePassword('PASSWORD123!')).toBe(true);
    expect(validatePassword('Pass123!')).toBe(true);
    expect(validatePassword('Pass123')).toBe(false);
    expect(validatePassword('Pass!')).toBe(false);
    expect(validatePassword('P@ssword')).toBe(true);
    expect(validatePassword('P@ssword123')).toBe(true);
    expect(validatePassword('P@ssword123!')).toBe(true);
});