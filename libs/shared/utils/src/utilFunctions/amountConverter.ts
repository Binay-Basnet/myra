export const amountConverter = (amount: number | string) => {
  const parsedAmount = typeof amount === 'string' ? parseInt(amount) : amount;

  return parsedAmount && parsedAmount.toLocaleString('en-IN');
};
