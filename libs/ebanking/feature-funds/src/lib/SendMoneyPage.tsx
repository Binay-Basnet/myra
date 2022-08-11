import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Box, Button, Icon, PathBar, Text } from '@coop/shared/ui';

import { SendMoneyForm } from '../components/send-money/SendMoneyForm';
import { SendMoneyResult } from '../components/send-money/SendMoneyResult';
import { SendMoneyReview } from '../components/send-money/SendMoneyReview';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure';

export const SendMoneyPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('form');

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          { label: 'Send Money', link: '/home/send-money' },
        ]}
      />

      <Box display={paymentStatus === 'form' ? 'block' : 'none'}>
        <SendMoneyForm setPaymentStatus={setPaymentStatus} />
      </Box>

      {paymentStatus === 'review' && (
        <SendMoneyReview setPaymentStatus={setPaymentStatus} />
      )}

      {paymentStatus === 'success' || paymentStatus === 'failure' ? (
        <SendMoneyResult
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
        />
      ) : null}

      {paymentStatus === 'form' ? (
        <Box
          h="50px"
          px="s16"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="white"
          borderRadius="br2"
        >
          <Text fontSize="r1" color="gray.700" fontWeight="600">
            Saved Payments (0)
          </Text>
          <Button variant="ghost" gap="s4">
            <Icon as={AiOutlinePlus} color="priamry.500" />
            Save New Payment
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};