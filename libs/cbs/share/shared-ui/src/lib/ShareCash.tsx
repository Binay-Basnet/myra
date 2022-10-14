import { Cash } from '../component/form/Cash';

/* eslint-disable-next-line */
export interface ShareCashProps {
  denominationTotal: number;
  totalCashPaid: number;
  returnAmount: number;
  totalAmount: number;
}

export const ShareCash = ({
  denominationTotal,
  totalCashPaid,
  returnAmount,
  totalAmount,
}: ShareCashProps) => (
  <Cash
    denominationTotal={denominationTotal}
    totalCashPaid={totalCashPaid}
    returnAmount={returnAmount}
    totalAmount={totalAmount}
  />
);

export default ShareCash;
