export const shortenedName = (
  name: string,
  lastName: string,
  patronymic: string,
): string => {
  return `${name}${patronymic ? ' ' + patronymic[0] + '.' : ''} ${lastName}`;
};
