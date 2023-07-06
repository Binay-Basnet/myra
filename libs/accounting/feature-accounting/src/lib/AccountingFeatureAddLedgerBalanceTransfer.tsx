import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Button, ResponseDialog } from '@myra-ui';

import {
  LedgerBalanceTransferRequestInput,
  useAppSelector,
  useInitiateLedgerBalanceTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { debitCreditConverter, quantityConverter } from '@coop/shared/utils';

import { DestinationDetails, SourceDetails, TransferDetails } from '../components';

export const AccountingFeatureAddLedgerBalanceTransfer = () => {
  const router = useRouter();

  const user = useAppSelector((state) => state?.auth?.user);

  const methods = useForm<LedgerBalanceTransferRequestInput>({
    defaultValues: { branchId: user?.currentBranch?.id },
  });

  const { watch } = methods;

  const coaHead = watch('coaHead');

  const { mutateAsync } = useInitiateLedgerBalanceTransferMutation();

  const handleInitiateTransfer = () => {
    const values = methods.getValues();

    return {
      transferMode: values?.transferMode,
      branchId: user?.currentBranch?.id,
      coaHead: values?.coaHead?.map((head) => (head as unknown as { value: string })?.value),
      tagId: values?.tagId,
      ledgerType: values?.ledgerType,
      destinationLedgerId: values?.destinationLedgerId,
    };
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Ledger Balance Transfer" />

      <FormLayout.Content>
        <FormLayout.Form>
          <SourceDetails />

          {coaHead?.length ? (
            <>
              <TransferDetails />

              <DestinationDetails />
            </>
          ) : null}
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Initiate Transfer"
        mainButton={
          <ResponseDialog
            promise={() => mutateAsync({ input: handleInitiateTransfer() })}
            successCardProps={(response) => {
              const result = response?.accounting?.ledgerBalanceTransfer?.initiateTransferRequest;

              return {
                type: 'Ledger Transfer',
                title: 'Ledger Balance Transfer Successful',
                details: {
                  'Total Source Ledger Acccounts': quantityConverter(
                    result?.data?.totalLedgerAccounts ?? 0
                  ),
                  'Destination Ledger': result?.data?.destinationLedgerName,
                  'Total Transfer Balance': debitCreditConverter(
                    result?.data?.totalTransferBalance?.amount as string,
                    result?.data?.totalTransferBalance?.amountType as string
                  ),
                },
                subTitle: 'Details of the transfer is listed below.',
              };
            }}
            onSuccess={() => router.push(ROUTES.ACCOUNTING_LEDGER_BALANCE_TRANSFER_LIST)}
            errorCardProps={{
              title: 'Initiating Transfer Failed',
            }}
          >
            <Button width="160px">Initiate Transfer</Button>
          </ResponseDialog>
        }
        mainButtonHandler={handleInitiateTransfer}
      />
    </FormLayout>
  );
};

export default AccountingFeatureAddLedgerBalanceTransfer;
