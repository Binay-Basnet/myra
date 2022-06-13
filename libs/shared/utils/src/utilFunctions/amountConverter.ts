type amountType = {
  amount: number;
};

export const amountConverter = ({ amount }: amountType) => {
  const data = amount && amount.toLocaleString('en-IN');
  return data;
};
