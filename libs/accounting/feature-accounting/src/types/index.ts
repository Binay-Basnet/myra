import { JournalVoucherInput } from '@coop/cbs/data-access';

export interface CustomJournalVoucherInput extends Omit<JournalVoucherInput, 'entries'> {
  entries: {
    ledger: string;
    accountId: { label: string; value: string };
    drAmount: string;
    crAmount: string;
    description: string;
  }[];
}
