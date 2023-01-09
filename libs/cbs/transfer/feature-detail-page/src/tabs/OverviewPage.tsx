import { CashInTransitView, GlTransaction, TellerTransferView } from '@coop/cbs/data-access';

import { GlTransactionTable, TabHeader, TxnDetails } from '../component';

type CustomTransactionItem = GlTransaction & {
  index?: string | number;
};

type OverviewProps = {
  data?: TellerTransferView | null | undefined;
  cashTransitData?: CashInTransitView | null | undefined;
  summary: {
    label: string;
    value: string | null | undefined | number;
  }[];
};

export const OverviewPage = ({ data, cashTransitData, summary }: OverviewProps) => (
  <>
    <TabHeader heading="Overview" />
    {data && <TxnDetails list={summary} status={data?.transferState} />}

    {cashTransitData && <TxnDetails list={summary} status={cashTransitData?.transitStatus} />}
    <GlTransactionTable
      totalAmount={data?.totalCredit ?? '0'}
      data={
        (data?.glTransaction?.map((t, index) => ({ ...t, index: index + 1 })) ??
          []) as CustomTransactionItem[]
      }
    />
  </>
);
