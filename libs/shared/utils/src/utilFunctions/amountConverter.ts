export const amountConverter = (amount: number | string) => {
  const parsedAmount = typeof amount === 'string' ? parseInt(amount, 10) : amount;

  return (
    parsedAmount &&
    parsedAmount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
    })
  );
};
