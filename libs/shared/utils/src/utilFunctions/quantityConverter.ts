export const quantityConverter = (amount: number | string) => {
  const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  return (
    parsedAmount &&
    parsedAmount.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
};
