export const amountConverter = (amount: number | string) => {
  const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  return (
    parsedAmount &&
    parsedAmount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
    })
  );
};
