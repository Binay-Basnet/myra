import { Account } from '../component/form/Account';

/* eslint-disable-next-line */
export interface ShareAccountProps {}

type AmountType = {
  totalAmount: number;
};

export const ShareAccount = ({ totalAmount }: AmountType) => <Account totalAmount={totalAmount} />;

export default ShareAccount;
