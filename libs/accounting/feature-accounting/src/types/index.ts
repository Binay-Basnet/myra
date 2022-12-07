import { JournalVoucherInput } from '@coop/cbs/data-access';

export interface CustomJournalVoucherInput extends Omit<JournalVoucherInput, 'entries'> {
  entries: {
    ledger: string;
    accountId: string;
    drAmount: string;
    crAmount: string;
    description: string;
  }[];
}
