import formatDate from './date';

describe('formatDate', () => {
  it('format correctly 24 hours', () => {
    const timestamp = 1710789736;
    const date = new Date(timestamp * 1000);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const formattedDate = formatDate(date.getTime() / 1000);
    expect(formattedDate).toBe('03/18/2024, 19:22:16');
  });
});
