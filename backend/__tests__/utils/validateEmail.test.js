const validateEmail = require('../../utils/validateEmail');

test('validate email', () => {
    expect(validateEmail('test@email.com')).toBe(true);
    expect(validateEmail('TESTtest123@o.co')).toBe(true);
    expect(validateEmail('email.com')).toBe(false);
});