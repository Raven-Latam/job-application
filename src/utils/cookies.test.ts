import CookiesName from '@/types/interfaces/cookies';
import { getCookie } from './cookies';

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: 'cookie_value' })),
  })),
}));

describe('getCookie function', () => {
  it('should return the value of the cookie if it exists', async () => {
    const cookieValue = await getCookie(CookiesName.ORDER_ID);
    expect(cookieValue).toEqual('cookie_value');
  });
});
