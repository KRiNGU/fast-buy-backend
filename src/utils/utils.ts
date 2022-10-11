import { hash } from 'bcrypt';

export const shortenedName = (
  name: string,
  lastName: string,
  patronymic: string,
): string => {
  return `${name}${patronymic ? ' ' + patronymic[0] + '.' : ''} ${lastName}`;
};

export const hashData = (data: string): Promise<string> => {
  return hash(data, 10);
};
