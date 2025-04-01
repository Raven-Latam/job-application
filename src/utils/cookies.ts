'use server';

import CookiesName from '@/types/interfaces/cookies';
import { CookieListItem } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function setCookie({ name, value, expires }: CookieListItem) {
  cookies().set({
    name,
    value,
    httpOnly: true,
    expires,
  });
}

export async function getCookie(name: CookiesName | string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}
