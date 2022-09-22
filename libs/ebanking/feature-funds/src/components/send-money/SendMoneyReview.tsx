import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { InfoCard } from '@coop/ebanking/cards';
import { Box, Button, Grid, Icon, PasswordInput, Text } from '@coop/shared/ui';

import { CardBodyContainer, CardContainer, CardContent, CardHeader } from '../CardContainer';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure';

interface SendMoneyReviewProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const SendMoneyReview = ({ setPaymentStatus }: SendMoneyReviewProps) => {
  const [hasTransactionPassword, setHasTransactionPassword] = useState(false);
  const { register, reset } = useForm();

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
            <CardHeader>Payee Details</CardHeader>
            <CardContent title="Source Account" subtitle="Salary Saving Account - 10101432" />
            <Grid templateColumns="repeat(3, 1fr)" gap="s16">
              <CardContent title="Recipient Name" subtitle="Madan Bahadur KC" />
              <CardContent title="Mobile Number" subtitle="9847814919" />
              <CardContent title="Account Number" subtitle="10233903930" />
              <CardContent title="Purpose" subtitle="Personal Use" />
              <CardContent title="Remarks" subtitle="Remaining Payment for monitor" />
            </Grid>
          </CardBodyContainer>
          <CardBodyContainer>
            <CardHeader>Payment Details</CardHeader>

            <CardContent title="Transaction Amount" subtitle="42,120.59" />
          </CardBodyContainer>
          {!hasTransactionPassword && (
            <Box display="flex" gap="s16">
              <Button
                w="100px"
                onClick={() => {
                  setHasTransactionPassword(true);
                }}
              >
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

      {hasTransactionPassword ? (
        <Box as="form" bg="white" p="s16" display="flex" flexDir="column" gap="s32">
          <Box display="flex" w="50%" flexDir="column" gap="s4">
            <PasswordInput {...register('password')} />
            <Text fontWeight="500" fontSize="s3" color="success.400">
              Forget your password ?
            </Text>
          </Box>
          <Box display="flex" gap="s16">
            <Button
              type="submit"
              w="100px"
              onClick={() => {
                setHasTransactionPassword(false);
                reset();

                if (Math.floor(Math.random() * 100) % 2 === 0) {
                  setPaymentStatus('success');
                } else {
                  setPaymentStatus('failure');
                }
              }}
            >
              Submit
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
              Clear
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
};
