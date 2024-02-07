export const amountConverter = (amount: number | string, addBracket?: boolean) => {
  let parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount ?? 0;

  if (addBracket && parsedAmount < 0) {
    parsedAmount = -parsedAmount;

    return `(${parsedAmount?.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })})`;
  }

  return parsedAmount?.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
