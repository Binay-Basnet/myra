import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box } from '@myra-ui';

import { EbankingPathBar, LoaderOverlay } from '@coop/ebanking/components';
import { useAppSelector, useMakePaymentMutation, UtilityInput } from '@coop/ebanking/data-access';
import { getMobileServiceProvider } from '@coop/ebanking/utils';

import { MobileTopup, MobileTopupPaymentReview, MobileTopupResult } from '../components';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading' | 'pending';

export type AccountTransferFormType = {
  sourceAccount: string;
  destinationAccount: string;
  amount: string;
  remarks: string;
};

export const UtilityMobileTopup = () => {
  // const [schema, setSchema] = useState<Utility | null | undefined>();

  const sourceAccount = useAppSelector(
    (state) => state?.auth?.cooperative?.user?.defaultAccount
  ) as string;

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('form');

  const [transactionCode, setTransactionCode] = useState<string>('');

  const [mutationMsg, setMutationMsg] = useState('');

  const methods = useForm<UtilityInput & Record<string, string>>({
    defaultValues: {
      sourceAccount,
    },
  });

  const { watch } = methods;

  const mobileNumber = watch('mobileNumber');

  const serviceProvider = useMemo(() => getMobileServiceProvider(mobileNumber), [mobileNumber]);

  const { mutateAsync } = useMakePaymentMutation({ onMutate: () => setPaymentStatus('loading') });

  const handleMakePayment = async () => {
    const values = methods.getValues();

    const response = await mutateAsync({
      input: {
        slug: (serviceProvider as string) || 'ntc',
        processSeq: '1',
        totalProcessingSequence: '1',
        sourceAccount: values?.['sourceAccount'],
        inputData: {
          mobileNumber: values?.['mobileNumber'],
          amount: values?.['amount'],
        },
        txnPin: values?.txnPin,
      },
    });

    if (
      !response?.eBanking?.utility?.makePayment?.error &&
      response?.eBanking?.utility?.makePayment?.data?.transactionId
    ) {
      setTransactionCode(response?.eBanking?.utility?.makePayment?.data?.transactionId as string);
      setMutationMsg(response?.eBanking?.utility?.makePayment?.data?.message);

      if (response?.eBanking?.utility?.makePayment?.status === 'SUCCESS') {
        setPaymentStatus('success');
      }
      if (response?.eBanking?.utility?.makePayment?.status === 'PENDING') {
        setPaymentStatus('pending');
      }
    } else {
      const error = response?.eBanking?.utility?.makePayment?.error;
      const errMsg =
        (error?.__typename === 'BadRequestError' && error?.badRequestErrorMessage) ||
        response?.eBanking?.utility?.makePayment?.data?.message;

      setMutationMsg(errMsg as string);
      setPaymentStatus('failure');
    }
  };

  return (
    <FormProvider {...methods}>
      <Box display="flex" flexDir="column" gap="s16">
        <EbankingPathBar
          paths={[
            { label: 'Utility Payments', link: '/utility-payments' },
            { label: 'Mobile Topup' },
          ]}
        />

        <Box display={paymentStatus === 'form' ? 'block' : 'none'}>
          <MobileTopup setPaymentStatus={setPaymentStatus} />
        </Box>

        {(paymentStatus === 'review' || paymentStatus === 'loading') && (
          <>
            {paymentStatus === 'loading' && <LoaderOverlay />}

            <MobileTopupPaymentReview
              setPaymentStatus={setPaymentStatus}
              handleMakePayment={handleMakePayment}
            />
          </>
        )}

        {paymentStatus === 'success' ||
        paymentStatus === 'failure' ||
        paymentStatus === 'pending' ? (
          <MobileTopupResult
            transactionCode={transactionCode}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            mutationMsg={mutationMsg}
            handleMakePayment={handleMakePayment}
          />
        ) : null}
      </Box>
    </FormProvider>
  );
};
