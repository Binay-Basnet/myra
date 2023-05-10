import { GeneralInformationDebitNote } from '../components/GeneralInformation';
import { DebitNoteNotes } from '../components/Notes';
import { PaymentDetailsDebitNote } from '../components/PaymentDetails';
import { ProductDetailsDebitNote } from '../components/ProductDetails';

export const Overview = () => (
  <>
    <GeneralInformationDebitNote />
    <ProductDetailsDebitNote />
    <PaymentDetailsDebitNote />
    <DebitNoteNotes />
  </>
);
