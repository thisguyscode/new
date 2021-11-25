export const pluralize = (number: number, singular: string, plural = `${singular}s`) => {
  if (number === 1) {
    return singular;
  }

  return plural;
};
