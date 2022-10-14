import { hash } from 'bcrypt';
import { SHA256 as sha256, enc } from 'crypto-js';

export const shortenedName = (
  name: string,
  lastName: string,
  patronymic: string,
): string => {
  return `${name}${patronymic ? ' ' + patronymic[0] + '.' : ''} ${lastName}`;
};

export const hashData = (data: string): Promise<string> => hash(data, 10);

export const hashDataEq = (data: string): string =>
  sha256(data).toString(enc.Base64);
