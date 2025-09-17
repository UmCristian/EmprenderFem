const resolvers = require('../resolvers');

test('User.id mapea _id a string', () => {
  const u = { _id: '507f1f77bcf86cd799439011' };
  expect(resolvers.User.id(u)).toBe('507f1f77bcf86cd799439011');
});

test('User.id usa id si existe', () => {
  const u = { id: 12345 };
  expect(resolvers.User.id(u)).toBe('12345');
});
