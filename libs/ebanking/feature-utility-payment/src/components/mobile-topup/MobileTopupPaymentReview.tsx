import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Box, Button, Grid, Icon, Text } from '@myra-ui';

import { InfoCard } from '@coop/ebanking/cards';
import { useGetAccountListQuery, useGetCashBackChargesQuery } from '@coop/ebanking/data-access';
import {
  CardBodyContainer,
  CardContainer,
  CardContent,
  CardHeader,
} from '@coop/ebanking/ui-layout';
import { getMobileServiceProvider } from '@coop/ebanking/utils';
import { FormPasswordInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading' | 'pending';

interface MobileTopupPaymentReviewProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
  handleMakePayment: () => Promise<void>;
}

const serviceProviderLabels: Record<string, string> = {
  ntc: 'Nepal Telecom',
  ncell: 'Ncell',
  smartcell: 'SmartCell',
};

export const MobileTopupPaymentReview = ({
  setPaymentStatus,

  handleMakePayment,
}: MobileTopupPaymentReviewProps) => {
  const [isReviewed, setIsReviewed] = useState(false);

  const { getValues, handleSubmit, setValue, watch } = useFormContext();

  const { data } = useGetAccountListQuery({ transactionPagination: { after: '', first: 1 } });
  const accounts = data?.eBanking?.account?.list?.accounts?.map((account) => ({
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
      <InfoCard
        title="Payment Review"
        btn={
          <Button variant="ghost" gap="s4">
            <Icon as={AiOutlinePlus} color="primary.500" />
            Schedule for later
          </Button>
        }
      >
        <CardContainer>
          <CardBodyContainer>
            <CardHeader>Payment Details (NPR)</CardHeader>
            <CardContent
              title="Source Account"
              subtitle={
                accounts?.find((account) => account.value === getValues().sourceAccount)
                  ?.label as string
              }
            />

            <Grid templateColumns="repeat(3, 1fr)" gap="s16">
              <CardContent title="Mobile Number" subtitle={getValues().mobileNumber} />

              <CardContent
                title="Service Provider"
                subtitle={serviceProviderLabels[serviceProvider as string]}
              />

              <CardContent title="Topup Amount" subtitle={amountConverter(getValues().amount)} />

              <CardContent title="Cashback" subtitle={amountConverter(cashBackAmount || 0)} />

              <CardContent
                title="Service Charge"
                subtitle={amountConverter(serviceChargeAmount || 0)}
              />
            </Grid>
          </CardBodyContainer>

          {!isReviewed && (
            <Box display="flex" gap="s16">
              <Button w="100px" onClick={() => setIsReviewed(true)}>
                Proceed
              </Button>
              <Button
                variant="outline"
                colorScheme="white"
                w="100px"
                cursor="pointer"
                onClick={() => {
                  setPaymentStatus('form');
                }}
              >
                Edit
              </Button>
            </Box>
          )}
        </CardContainer>
      </InfoCard>

      {isReviewed && (
        <Box bg="white" borderRadius="br2">
          <CardContainer>
            <CardBodyContainer>
              <Grid templateColumns="repeat(2, 1fr)">
                <Box display="flex" flexDir="column" gap="s4">
                  <FormPasswordInput
                    name="txnPin"
                    label="Enter your Transaction Password"
                    rules={{ required: 'Transaction Password is required' }}
                  />

                  <Text fontSize="r1" fontWeight={500} color="primary.500">
                    Forgot your Password?
                  </Text>
                </Box>
              </Grid>
            </CardBodyContainer>

            <Box display="flex" gap="s16">
              <Button w="100px" onClick={handleSubmit(handleMakePayment)}>
                Submit
              </Button>
              <Button
                variant="outline"
                colorScheme="white"
                w="100px"
                cursor="pointer"
                onClick={() => {
                  setValue('txnPin', '');
                }}
              >
                Clear
              </Button>
            </Box>
          </CardContainer>
        </Box>
      )}
    </>
  );
};
