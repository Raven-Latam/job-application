/* eslint-disable import/prefer-default-export */

'use server';

import { setCookie } from '@/utils/cookies';

export async function testAction(orderId: string) {
  setCookie({ name: '__session', value: orderId });
}
