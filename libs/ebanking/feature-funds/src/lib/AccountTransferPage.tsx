import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { LoaderOverlay } from '@coop/ebanking/components';
import { useAppSelector } from '@coop/ebanking/data-access';
import { Box, PathBar } from '@myra-ui';

import { AccountTransferForm } from '../components/account-transfer/AccountTransfer';
import { AccountTransferResult } from '../components/account-transfer/AccountTransferResult';
import { AccountTransferReview } from '../components/account-transfer/AccountTransferReview';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading';

export type AccountTransferFormType = {
  sourceAccount: string;
  destinationAccount: string;
  amount: string;
  remarks: string;
};

export const AccountTransferPage = () => {
  const sourceAccount = useAppSelector(
    (state) => state?.auth?.cooperative?.user?.defaultAccount
  ) as string;
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('form');

  const [transactionCode, setTransactionCode] = useState<string>('');

  const methods = useForm<AccountTransferFormType>({
    defaultValues: {
      sourceAccount,
    },
  });

  useEffect(() => {
    if (sourceAccount) {
      methods.reset({ sourceAccount });
    }
  }, [sourceAccount]);

  return (
    <FormProvider {...methods}>
      <Box display="flex" flexDir="column" gap="s16">
        <PathBar
          paths={[
            { label: 'Home', link: '/home' },
            { label: 'Account Transfer', link: '/home/account-transfer' },
          ]}
        />

        <Box display={paymentStatus === 'form' ? 'block' : 'none'}>
          <AccountTransferForm setPaymentStatus={setPaymentStatus} />
        </Box>

        {(paymentStatus === 'review' || paymentStatus === 'loading') && (
          <>
            {paymentStatus === 'loading' && <LoaderOverlay />}

            <AccountTransferReview
              setTransactionCode={setTransactionCode}
              setPaymentStatus={setPaymentStatus}
            />
          </>
        )}

        {paymentStatus === 'success' || paymentStatus === 'failure' ? (
          <AccountTransferResult
            transactionCode={transactionCode}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
          />
        ) : null}
      </Box>
    </FormProvider>
  );
};
