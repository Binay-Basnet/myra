import { ToWords } from 'to-words';

export const amountToWordsConverter = (amount: number | string) => {
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
    },
  });
  const convertedAmount = typeof amount === 'string' ? parseInt(amount, 10) : amount;
  return !Number.isNaN(convertedAmount) ? toWords.convert(convertedAmount ?? 0) : 'Not Available';
};
