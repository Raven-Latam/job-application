export default class GenericError extends Error {
  constructor(
    message = {
      title: 'Our apologies!',
      description:
        'An error occurred while processing your request. Please try again later or contact us if the problem persists.',
    }
  ) {
    super(JSON.stringify(message));
    this.name = 'GenericError';
  }
}
