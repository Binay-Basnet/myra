import { GlTransaction, TellerTransferView } from '@coop/cbs/data-access';

import { GlTransactionTable, TabHeader, TxnDetails } from '../component';

type CustomTransactionItem = GlTransaction & {
  index?: string | number;
};

type OverviewProps = {
  data: TellerTransferView | null | undefined;
  summary: {
    label: string;
    value: string | null | undefined | number;
  }[];
};

export const OverviewPage = ({ data, summary }: OverviewProps) => (
  <>
    <TabHeader heading="Overview" />
    <TxnDetails list={summary} status={data?.transferState} />
    <GlTransactionTable
      totalAmount={data?.totalCredit ?? '0'}
      data={
        (data?.glTransaction?.map((t, index) => ({ ...t, index: index + 1 })) ??
          []) as CustomTransactionItem[]
      }
    />
  </>
);
