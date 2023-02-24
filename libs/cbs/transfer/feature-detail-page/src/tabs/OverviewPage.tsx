import { useRouter } from 'next/router';

import {
  CashInTransitView,
  CashTransferBranchView,
  CashTransferLedgerView,
  ServiceCenterCashTransferView,
  TellerBankTransferView,
  TellerTransferView,
} from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

import {
  GlTransaction,
  MyLedger,
  Note,
  ServiceCenterList,
  TabHeader,
  TxnDetails,
} from '../component';

type OverviewProps = {
  data?: TellerTransferView | null | undefined;
  tellerBankData?: TellerBankTransferView | null | undefined;
  cashTransitData?: CashInTransitView | null | undefined;
  serviceCenterTransfer?: ServiceCenterCashTransferView | null | undefined;
  summary: {
    label: string;
    value: string | null | undefined | number;
  }[];
};

export const OverviewPage = ({
  data,
  cashTransitData,
  serviceCenterTransfer,
  summary,
  tellerBankData,
}: OverviewProps) => {
  const router = useRouter();

  return (
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
      {serviceCenterTransfer && (
        <>
          <TxnDetails list={summary} status={serviceCenterTransfer?.status} />
          {serviceCenterTransfer?.note && <Note note={serviceCenterTransfer?.note} />}
          {router?.query['objState'] !== 'RECEIVED' && (
            <>
              <MyLedger
                data={serviceCenterTransfer?.srcLedgerInfo as [CashTransferLedgerView]}
                totalCr={serviceCenterTransfer?.totalSenderCr}
                totalDr={serviceCenterTransfer?.totalSenderDr}
              />
              <ServiceCenterList
                data={serviceCenterTransfer?.destinationBranchInfo as [CashTransferBranchView]}
                totalCr={serviceCenterTransfer?.totalServiceCenterCr}
                totalDr={serviceCenterTransfer?.totalServiceCenterDr}
              />
            </>
          )}

          <GlTransaction
            data={serviceCenterTransfer?.glTransaction}
            totalDebit={String(amountConverter(serviceCenterTransfer?.totalDebit ?? 0))}
            totalCredit={String(amountConverter(serviceCenterTransfer?.totalCredit ?? 0))}
          />
        </>
      )}

      {tellerBankData && (
        <>
          <TxnDetails list={summary} status={tellerBankData?.status} />
          {/* {tellerBankData?.note && <Note note={tellerBankData?.note} />} */}
          <GlTransaction
            data={tellerBankData?.glTransaction}
            totalDebit={String(amountConverter(tellerBankData?.totalDebit ?? 0))}
            totalCredit={String(amountConverter(tellerBankData?.totalCredit ?? 0))}
          />
        </>
      )}
    </>
  );
};
