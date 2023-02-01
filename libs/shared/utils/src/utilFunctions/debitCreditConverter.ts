import { amountConverter } from './amountConverter';

export const debitCreditConverter = (amount: number | string, type: string) => {
  if (amount === '0') return amountConverter(amount);

  const convertedAmount = amountConverter(amount);

  if (type === 'CR') {
    return `Cr ${convertedAmount}`;
  }

  return `Dr ${convertedAmount}`;
};
