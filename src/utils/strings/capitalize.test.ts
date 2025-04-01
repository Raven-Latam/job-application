import replaceAndCapitalize from './capitalize';

describe('replaceAndCapitalize', () => {
  it('should replace hyphens with spaces and capitalize first letter of each word', () => {
    const inputString = 'hello-world';
    const expectedOutput = 'Hello World';
    expect(replaceAndCapitalize(inputString)).toBe(expectedOutput);
  });

  it('should handle empty string', () => {
    const inputString = '';
    const expectedOutput = '';
    expect(replaceAndCapitalize(inputString)).toBe(expectedOutput);
  });

  it('should handle single word', () => {
    const inputString = 'hello';
    const expectedOutput = 'Hello';
    expect(replaceAndCapitalize(inputString)).toBe(expectedOutput);
  });

  it('should handle single letter word', () => {
    const inputString = 'a-b-c';
    const expectedOutput = 'A B C';
    expect(replaceAndCapitalize(inputString)).toBe(expectedOutput);
  });
});
