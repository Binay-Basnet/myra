export type IPurchaseFormValues = {
  memberID: string;
  noOfShares: number;
  shareAmount: number;
  extraFee: number;
  extraCharges: number;
  totalAmount: number;
  fullName: string;
  paymentMode: string;
  selectAccount: string;
};

export default IPurchaseFormValues;
