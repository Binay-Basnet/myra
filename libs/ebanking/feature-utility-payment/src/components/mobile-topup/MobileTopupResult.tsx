import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Button, Grid } from '@myra-ui';

import { ResultModal, TransactionHeaderCardWithChip } from '@coop/ebanking/cards';
import { useGetAccountListQuery, useGetCashBackChargesQuery } from '@coop/ebanking/data-access';
import {
  CardBodyContainer,
  CardContainer,
  CardContent,
  CardHeader,
} from '@coop/ebanking/ui-layout';
import { getMobileServiceProvider } from '@coop/ebanking/utils';
import { amountConverter } from '@coop/shared/utils';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading' | 'pending';

interface MobileTopupResultProps {
  paymentStatus: 'success' | 'failure' | 'pending';

  transactionCode: string;
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
  mutationMsg: string;
  handleMakePayment: () => Promise<void>;
}

const serviceProviderLabels: Record<string, string> = {
  ntc: 'Nepal Telecom',
  ncell: 'Ncell',
  smartcell: 'SmartCell',
};

export const MobileTopupResult = ({
  paymentStatus,
  transactionCode,
  setPaymentStatus,
  mutationMsg,
  handleMakePayment,
}: MobileTopupResultProps) => {
  const router = useRouter();
  const methods = useFormContext();

  const { watch } = methods;

  const { data: accountData } = useGetAccountListQuery({
    transactionPagination: { after: '', first: 1 },
  });
  const accounts = accountData?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account?.accountNumber}`,
    value: account?.id as string,
  }));

  const mobileNumber = watch('mobileNumber');

  const serviceProvider = useMemo(() => getMobileServiceProvider(mobileNumber), [mobileNumber]);

  const amount = watch('amount');

  const { data: cashBackData } = useGetCashBackChargesQuery(
    {
      input: {
        slug: serviceProvider as string,
        amount,
      },
    },
    {
      enabled: !!serviceProvider && !!amount,
    }
  );

  const { cashBackAmount, serviceChargeAmount } = useMemo(
    () => ({
      cashBackAmount: cashBackData?.eBanking?.utility?.getCashBackCharges?.data?.cashBack,
      serviceChargeAmount: cashBackData?.eBanking?.utility?.getCashBackCharges?.data?.serviceCharge,
    }),
    [cashBackData]
  );

  return (
    <>
      <ResultModal
        status={paymentStatus}
        title={
          paymentStatus === 'failure'
            ? 'Payment Failed'
            : paymentStatus === 'pending'
            ? 'Payment Pending'
            : 'Payment Successful'
        }
        description={mutationMsg}
      />
      <Box display="flex" flexDir="column" bg="white" borderRadius="br2" overflow="hidden">
        <TransactionHeaderCardWithChip
          chipText={
            paymentStatus === 'failure'
              ? 'Payment Failed'
              : paymentStatus === 'pending'
              ? 'Payment Pending'
              : 'Payment Successful'
          }
          status={paymentStatus}
        />

        <CardContainer>
          <CardBodyContainer>
            <CardHeader>Transaction Details</CardHeader>

            {paymentStatus !== 'failure' && (
              <CardContent title="Transaction Code" subtitle={transactionCode} />
            )}

            <CardContent
              title="Source Account"
              subtitle={
                accounts?.find((account) => account.value === methods?.getValues().sourceAccount)
                  ?.label as string
              }
            />

            <Grid templateColumns="repeat(3, 1fr)" gap="s16">
              <CardContent title="Mobile Number" subtitle={methods?.getValues().mobileNumber} />

              <CardContent
                title="Service Provider"
                subtitle={serviceProviderLabels[serviceProvider as string]}
              />

              <CardContent
                title="Topup Amount"
                subtitle={amountConverter(methods?.getValues().amount)}
              />

              <CardContent title="Cashback" subtitle={amountConverter(cashBackAmount || 0)} />

              <CardContent
                title="Service Charge"
                subtitle={amountConverter(serviceChargeAmount || 0)}
              />
            </Grid>
          </CardBodyContainer>

          {paymentStatus === 'failure' ? (
            <Box display="flex" gap="s16">
              <Button w="100px" shade="danger" onClick={handleMakePayment}>
                Retry
              </Button>
              <Button
                variant="outline"
                colorScheme="gray"
                w="100px"
                cursor="pointer"
                onClick={() => {
                  setPaymentStatus('review');
                }}
              >
                Go Back
              </Button>
            </Box>
          ) : (
            <Box display="flex" gap="s16">
              <Button
                w="100px"
                onClick={() => {
                  router.push('/home');
                }}
              >
                Done
              </Button>
              <Button variant="outline" colorScheme="gray" w="100px" cursor="pointer">
                Save
              </Button>
            </Box>
          )}
        </CardContainer>
      </Box>
    </>
  );
};
