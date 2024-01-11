import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Button, Grid } from '@myra-ui';

import { ResultModal, TransactionHeaderCardWithChip } from '@coop/ebanking/cards';
import {
  useGetAccountListQuery,
  useGetCashBackChargesQuery,
  Utility,
} from '@coop/ebanking/data-access';
import {
  CardBodyContainer,
  CardContainer,
  CardContent,
  CardHeader,
} from '@coop/ebanking/ui-layout';
import { amountConverter } from '@coop/shared/utils';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'pending';

interface MobileTopupResultProps {
  paymentStatus: 'success' | 'failure' | 'pending';
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
  mutationMsg: string;
  handleMakePayment: () => Promise<void>;
  schema: Utility;
  currentSequence: number;
  response: Record<number, Record<string, string> | null | undefined>;
  transactionCode: string;
}

export const InternetPaymentResult = ({
  paymentStatus,
  setPaymentStatus,
  mutationMsg,
  handleMakePayment,
  schema,
  currentSequence,
  response,
  transactionCode,
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

  const values = methods.getValues();

  const amount = methods.watch('amount');

  const { data: cashBackData } = useGetCashBackChargesQuery(
    {
      input: {
        slug: schema?.slug,
        amount,
      },
    },
    {
      enabled: !!schema?.slug && !!amount,
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

            <Grid templateColumns="repeat(3, 1fr)">
              {schema?.sequence[Number(schema?.totalProcessingSequence) - 1]?.requiredFields?.map(
                (field) => {
                  if (!field?.fieldLabel) {
                    return null;
                  }

                  let displayValue = values[field?.fieldName as string];

                  if (field?.fieldType === 'OPTION') {
                    const prevField = schema?.sequence?.[
                      currentSequence - 2
                    ]?.responseFieldMapping?.find((prev) => prev?.mapField === field?.fieldName);

                    const responseOptions =
                      response?.[currentSequence - 1]?.[prevField?.fieldName as string];

                    const selectedOption = (
                      responseOptions as unknown as Record<string, string>[]
                    )?.find(
                      (opt) =>
                        opt?.[prevField?.options?.key as string] ===
                        values[field?.fieldName as string]
                    );

                    displayValue = selectedOption?.[prevField?.options?.value as string];
                  }

                  return (
                    <CardContent title={field?.fieldLabel as string} subtitle={displayValue} />
                  );
                }
              )}

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
