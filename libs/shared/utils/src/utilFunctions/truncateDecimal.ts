export const truncateDecimal = (number: number, decimal: number) =>
  Math.floor(number * 10 ** decimal) / 10 ** decimal;
