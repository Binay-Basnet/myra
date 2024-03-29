import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, getError, MutationError } from '@myra-ui';

import { EbankingPathBar, LoaderOverlay } from '@coop/ebanking/components';
import {
  useAppSelector,
  useGetUtilityQuery,
  useMakePaymentMutation,
  Utility,
} from '@coop/ebanking/data-access';

import { UtilityPaymentForm, UtilityPaymentResult, UtilityPaymentReview } from '../components';
import { ElectricityBill, ElectricityPaymentInitial } from '../components/electricity-payment';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'pending';

export const UtilityElectricityPayment = () => {
  const [currentSequence, setCurrentSequence] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [schema, setSchema] = useState<Utility | null>();

  const [response, setResponse] = useState<
    Record<number, Record<string, string> | null | undefined>
  >({});

  const sourceAccount = useAppSelector(
    (state) => state?.auth?.cooperative?.user?.defaultAccount
  ) as string;
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('form');

  const [transactionCode, setTransactionCode] = useState<string>('');
  const [mutationMsg, setMutationMsg] = useState<string>('');

  const methods = useForm<Record<string, string>>({
    defaultValues: {
      sourceAccount,
    },
  });

  const { watch } = methods;

  const slug = watch('slug');

  const { refetch } = useGetUtilityQuery(
    {
      slug: slug as unknown as string,
    },
    {
      enabled: !!slug,
      onSuccess: (utilityData) => {
        setSchema(utilityData?.eBanking?.utility?.getUtility?.utility);
      },
    }
  );

  useEffect(() => {
    if (slug) {
      refetch();
    }
  }, [slug]);

  const { mutateAsync: utilitySubmit } = useMakePaymentMutation({
    onMutate: () => setIsLoading(true),
  });

  const currentSequenceObj = schema?.sequence?.find(
    (seq) => Number(seq.processSeq) === currentSequence
  );

  const handlePayment = async () => {
    const values = methods.getValues();

    const inputDataObj: Record<string, string> = {};

    currentSequenceObj?.requiredFields?.forEach((field) => {
      inputDataObj[field?.fieldName as string] = values?.[field?.fieldName as string] as string;
    });

    const submitResponse = await utilitySubmit({
      input: {
        slug: values?.['slug'],
        sourceAccount: values?.['sourceAccount'],
        inputData: inputDataObj,
        txnPin: values?.['txnPin'],
      },
    });

    setIsLoading(false);

    if (
      !submitResponse?.eBanking?.utility?.makePayment?.error &&
      submitResponse?.eBanking?.utility?.makePayment?.data?.transactionId
    ) {
      setTransactionCode(
        submitResponse?.eBanking?.utility?.makePayment?.data?.transactionId as string
      );
      setMutationMsg(submitResponse?.eBanking?.utility?.makePayment?.data?.message);

      if (submitResponse?.eBanking?.utility?.makePayment?.status === 'SUCCESS') {
        setPaymentStatus('success');
      }
      if (submitResponse?.eBanking?.utility?.makePayment?.status === 'PENDING') {
        setPaymentStatus('pending');
      }
    } else {
      const error = submitResponse?.eBanking?.utility?.makePayment?.error;
      const errMsg =
        submitResponse?.eBanking?.utility?.makePayment?.data?.message ||
        getError(error as MutationError);

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
            { label: 'Electricity' },
          ]}
        />

        <Box display={paymentStatus === 'form' && currentSequence === 0 ? 'block' : 'none'}>
          <ElectricityPaymentInitial setCurrentSequence={setCurrentSequence} />
        </Box>

        {currentSequence === 1 && paymentStatus === 'form' && (
          <Box>
            <UtilityPaymentForm
              currentSequence={currentSequence}
              setCurrentSequence={setCurrentSequence}
              schema={schema as Utility}
              setResponse={setResponse}
              response={response}
              setPaymentStatus={setPaymentStatus}
              setIsLoading={setIsLoading}
            />
          </Box>
        )}

        {currentSequence === 2 && paymentStatus === 'form' && (
          <Box>
            <ElectricityBill
              currentSequence={currentSequence}
              setCurrentSequence={setCurrentSequence}
              schema={schema as Utility}
              setResponse={setResponse}
              response={response}
              setPaymentStatus={setPaymentStatus}
              setIsLoading={setIsLoading}
            />
          </Box>
        )}

        {paymentStatus === 'review' && (
          <UtilityPaymentReview
            setPaymentStatus={setPaymentStatus}
            handleMakePayment={handlePayment}
            schema={schema as Utility}
            currentSequence={currentSequence}
            response={response}
          />
        )}

        {paymentStatus === 'success' ||
        paymentStatus === 'failure' ||
        paymentStatus === 'pending' ? (
          <UtilityPaymentResult
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            mutationMsg={mutationMsg}
            handleMakePayment={handlePayment}
            schema={schema as Utility}
            currentSequence={currentSequence}
            response={response}
            transactionCode={transactionCode}
          />
        ) : null}

        {isLoading && <LoaderOverlay />}
      </Box>
    </FormProvider>
  );
};
