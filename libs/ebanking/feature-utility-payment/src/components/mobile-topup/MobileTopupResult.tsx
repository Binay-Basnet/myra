import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Button, Grid } from '@myra-ui';

import { ResultModal, TransactionHeaderCardWithChip } from '@coop/ebanking/cards';
import { useGetAccountListQuery } from '@coop/ebanking/data-access';
import {
  CardBodyContainer,
  CardContainer,
  CardContent,
  CardHeader,
} from '@coop/ebanking/ui-layout';
import { amountConverter } from '@coop/shared/utils';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading' | 'pending';

interface MobileTopupResultProps {
  paymentStatus: 'success' | 'failure' | 'pending';

  transactionCode: string;
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
  mutationMsg: string;
  handleMakePayment: () => Promise<void>;
}

export const MobileTopupResult = ({
  paymentStatus,
  transactionCode,
  setPaymentStatus,
  mutationMsg,
  handleMakePayment,
}: MobileTopupResultProps) => {
  const router = useRouter();
  const methods = useFormContext();

  const { data: accountData } = useGetAccountListQuery({
    transactionPagination: { after: '', first: 1 },
  });
  const accounts = accountData?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account?.accountNumber}`,
    value: account?.id as string,
  }));

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

            <Grid templateColumns="repeat(3, 1fr)">
              <CardContent title="Mobile Number" subtitle={methods?.getValues().mobileNumber} />

              <CardContent
                title="Topup Amount"
                subtitle={amountConverter(methods?.getValues().amount)}
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
