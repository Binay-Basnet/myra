import { CashInTransitView, TellerTransferView } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

import { GlTransaction, Note, TabHeader, TxnDetails } from '../component';

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
    {data && (
      <>
        <TxnDetails list={summary} status={data?.transferState} />
        {data?.note && <Note note={data?.note} />}
        <GlTransaction
          data={data?.glTransaction}
          totalDebit={String(amountConverter(data?.totalDebit ?? 0))}
          totalCredit={String(amountConverter(data?.totalCredit ?? 0))}
        />
      </>
    )}

    {cashTransitData && (
      <>
        <TxnDetails list={summary} status={cashTransitData?.transitStatus} />
        {cashTransitData?.note && <Note note={cashTransitData?.note} />}

        <GlTransaction
          data={cashTransitData?.glTransaction}
          totalDebit={String(amountConverter(cashTransitData?.totalDebit ?? 0))}
          totalCredit={String(amountConverter(cashTransitData?.totalCredit ?? 0))}
        />
      </>
    )}
  </>
);
