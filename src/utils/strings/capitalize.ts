function replaceAndCapitalize(input: string): string {
  // Split the input string by spaces
  const words = input.split('-');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the capitalized words with spaces
  const result = capitalizedWords.join(' ');

  return result;
}

export default replaceAndCapitalize;
