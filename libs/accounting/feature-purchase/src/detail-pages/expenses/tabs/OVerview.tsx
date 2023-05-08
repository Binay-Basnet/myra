import { ExpenseLedgers } from '../components/ExpensesLedger';
import { GeneralInformationExpenses } from '../components/GeneralInformation';
import { GLTRansactionTable } from '../components/GLTransactionsTable';
import { ExpensesNotes } from '../components/Notes';
import { PaymentDetailsExpensne } from '../components/PaymentDetails';

export const Overview = () => (
  <>
    <GeneralInformationExpenses />
    <ExpenseLedgers />
    <GLTRansactionTable />

    <PaymentDetailsExpensne />
    <ExpensesNotes />
  </>
);
