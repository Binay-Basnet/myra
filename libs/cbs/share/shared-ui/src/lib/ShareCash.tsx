import Cash from '../component/form/Cash';

/* eslint-disable-next-line */
export interface ShareCashProps {
  denominationTotal: number;
  totalCashPaid: number;
  returnAmount: number;
}

export const ShareCash = ({ denominationTotal, totalCashPaid, returnAmount }: ShareCashProps) => (
  <Cash
    denominationTotal={denominationTotal}
    totalCashPaid={totalCashPaid}
    returnAmount={returnAmount}
  />
);

export default ShareCash;
